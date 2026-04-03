import React from 'react';
import { Activity, Volume2, Radio } from 'lucide-react';

interface StatsDisplayProps {
  averageVolume: number;
  isListening: boolean;
  frequencyData: Uint8Array;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  averageVolume,
  isListening,
  frequencyData,
}) => {
  // Calculate peak frequency band
  let peakIndex = 0;
  let peakValue = 0;
  frequencyData.forEach((value, index) => {
    if (value > peakValue) {
      peakValue = value;
      peakIndex = index;
    }
  });

  // Estimate frequency range for peak
  const frequencyRange = (peakIndex / frequencyData.length) * 20000;
  const frequencyLabel = frequencyRange < 300 ? 'Bass' 
    : frequencyRange < 2000 ? 'Mid' 
    : frequencyRange < 6000 ? 'High'
    : 'Treble';

  const stats = [
    {
      icon: Volume2,
      label: 'Volume',
      value: isListening ? `${Math.round(averageVolume * 100)}%` : '—',
      color: 'text-primary',
    },
    {
      icon: Activity,
      label: 'Peak',
      value: isListening ? `${Math.round(peakValue / 255 * 100)}%` : '—',
      color: 'text-accent',
    },
    {
      icon: Radio,
      label: 'Dominant',
      value: isListening && peakValue > 10 ? frequencyLabel : '—',
      color: 'text-glow-success',
    },
  ];

  return (
    <div className="flex gap-6 justify-center flex-wrap">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass rounded-lg px-5 py-3 flex items-center gap-3 min-w-[120px]"
        >
          <stat.icon className={`h-5 w-5 ${stat.color}`} />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-lg font-semibold font-mono text-foreground">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
