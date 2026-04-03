import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioControlsProps {
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
  onToggle: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isListening,
  isSupported,
  error,
  onToggle,
}) => {
  if (!isSupported) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Browser not supported</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">
          Your browser doesn't support microphone access. Please try Chrome, Firefox, or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={onToggle}
        variant={isListening ? 'destructive' : 'default'}
        size="lg"
        className={`
          relative h-16 w-16 rounded-full p-0 transition-all duration-300
          ${isListening 
            ? 'bg-destructive hover:bg-destructive/90 shadow-[0_0_30px_hsl(0_84%_60%/0.4)]' 
            : 'bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(180_100%_50%/0.4)]'
          }
        `}
      >
        {isListening ? (
          <MicOff className="h-7 w-7" />
        ) : (
          <Mic className="h-7 w-7" />
        )}
        
        {/* Pulse rings when listening */}
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-destructive animate-ping opacity-30" />
            <span className="absolute inset-[-8px] rounded-full border border-destructive/30 pulse-ring" />
          </>
        )}
      </Button>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium text-foreground">
          {isListening ? 'Listening...' : 'Start Microphone'}
        </span>
        <span className="text-xs text-muted-foreground">
          {isListening ? 'Click to stop' : 'Click to analyze audio'}
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-2 rounded-lg">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};
