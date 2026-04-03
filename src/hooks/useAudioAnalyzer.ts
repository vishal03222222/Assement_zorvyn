import { useState, useRef, useCallback, useEffect } from 'react';

interface AudioAnalyzerState {
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
  frequencyData: Uint8Array;
  averageVolume: number;
}

const FFT_SIZE = 256;
const FREQUENCY_BANDS = 64;

export function useAudioAnalyzer() {
  const [state, setState] = useState<AudioAnalyzerState>({
    isListening: false,
    isSupported: typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia,
    error: null,
    frequencyData: new Uint8Array(FREQUENCY_BANDS),
    averageVolume: 0,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array>(new Uint8Array(FREQUENCY_BANDS));

  const updateFrequencyData = useCallback(() => {
    if (!analyserRef.current || !state.isListening) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const fullDataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(fullDataArray);

    // Sample frequency bands evenly across the spectrum
    const step = Math.floor(bufferLength / FREQUENCY_BANDS);
    for (let i = 0; i < FREQUENCY_BANDS; i++) {
      const startIdx = i * step;
      const endIdx = Math.min(startIdx + step, bufferLength);
      let sum = 0;
      for (let j = startIdx; j < endIdx; j++) {
        sum += fullDataArray[j];
      }
      dataArrayRef.current[i] = Math.floor(sum / step);
    }

    // Calculate average volume
    const avgVolume = dataArrayRef.current.reduce((a, b) => a + b, 0) / FREQUENCY_BANDS / 255;

    setState(prev => ({
      ...prev,
      frequencyData: new Uint8Array(dataArrayRef.current),
      averageVolume: avgVolume,
    }));

    animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
  }, [state.isListening]);

  const startListening = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }));

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Connect microphone to analyser
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;

      setState(prev => ({ ...prev, isListening: true }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access microphone';
      setState(prev => ({ ...prev, error: errorMessage, isListening: false }));
    }
  }, []);

  const stopListening = useCallback(() => {
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Disconnect source
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Stop media stream tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    analyserRef.current = null;

    // Reset frequency data
    dataArrayRef.current = new Uint8Array(FREQUENCY_BANDS);

    setState(prev => ({
      ...prev,
      isListening: false,
      frequencyData: new Uint8Array(FREQUENCY_BANDS),
      averageVolume: 0,
    }));
  }, []);

  const toggleListening = useCallback(() => {
    if (state.isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [state.isListening, startListening, stopListening]);

  // Start animation loop when listening
  useEffect(() => {
    if (state.isListening && analyserRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state.isListening, updateFrequencyData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    ...state,
    startListening,
    stopListening,
    toggleListening,
    bandCount: FREQUENCY_BANDS,
  };
}
