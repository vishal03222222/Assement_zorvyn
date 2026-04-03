import React from 'react';

interface FrequencyBarsProps {
  frequencyData: Uint8Array;
  isListening: boolean;
}

export const FrequencyBars: React.FC<FrequencyBarsProps> = ({
  frequencyData,
  isListening,
}) => {
  // Show fewer bars for the linear display
  const displayBands = 32;
  const step = Math.floor(frequencyData.length / displayBands);
  
  const bands = Array.from({ length: displayBands }, (_, i) => {
    const startIdx = i * step;
    const endIdx = Math.min(startIdx + step, frequencyData.length);
    let sum = 0;
    for (let j = startIdx; j < endIdx; j++) {
      sum += frequencyData[j];
    }
    return sum / step / 255;
  });

  return (
    <div className="w-full max-w-lg glass rounded-xl p-6">
      <div className="flex items-end justify-center gap-1 h-24">
        {bands.map((value, index) => {
          const height = Math.max(4, value * 80);
          const hue = 180 + (index / displayBands) * 100;
          
          return (
            <div
              key={index}
              className="flex-1 rounded-t-sm transition-all duration-75"
              style={{
                height: `${height}px`,
                background: isListening
                  ? `linear-gradient(to top, hsl(${hue}, 80%, 40%), hsl(${hue}, 100%, 60%))`
                  : 'hsl(var(--muted))',
                boxShadow: value > 0.5 && isListening
                  ? `0 0 10px hsl(${hue}, 100%, 60%)`
                  : 'none',
              }}
            />
          );
        })}
      </div>
      
      <div className="flex justify-between mt-3 text-xs text-muted-foreground font-mono">
        <span>20Hz</span>
        <span>Frequency Spectrum</span>
        <span>20kHz</span>
      </div>
    </div>
  );
};
