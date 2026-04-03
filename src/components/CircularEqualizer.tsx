import React, { useMemo } from 'react';

interface CircularEqualizerProps {
  frequencyData: Uint8Array;
  averageVolume: number;
  isListening: boolean;
  size?: number;
}

export const CircularEqualizer: React.FC<CircularEqualizerProps> = ({
  frequencyData,
  averageVolume,
  isListening,
  size = 400,
}) => {
  const bars = useMemo(() => {
    const barCount = frequencyData.length;
    const centerX = size / 2;
    const centerY = size / 2;
    const innerRadius = size * 0.2;
    const maxBarHeight = size * 0.25;

    return Array.from(frequencyData).map((value, index) => {
      const angle = (index / barCount) * Math.PI * 2 - Math.PI / 2;
      const normalizedValue = value / 255;
      const barHeight = Math.max(4, normalizedValue * maxBarHeight);
      
      const x1 = centerX + Math.cos(angle) * innerRadius;
      const y1 = centerY + Math.sin(angle) * innerRadius;
      const x2 = centerX + Math.cos(angle) * (innerRadius + barHeight);
      const y2 = centerY + Math.sin(angle) * (innerRadius + barHeight);

      // Color gradient from cyan to purple based on position
      const hue = 180 + (index / barCount) * 100;
      const saturation = 80 + normalizedValue * 20;
      const lightness = 50 + normalizedValue * 20;

      return {
        x1,
        y1,
        x2,
        y2,
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        glowColor: `hsl(${hue}, 100%, 60%)`,
        intensity: normalizedValue,
        index,
      };
    });
  }, [frequencyData, size]);

  const glowIntensity = isListening ? 0.3 + averageVolume * 0.7 : 0.2;
  const pulseScale = isListening ? 1 + averageVolume * 0.1 : 1;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-radial transition-opacity duration-300"
        style={{
          opacity: glowIntensity,
          transform: `scale(${pulseScale})`,
        }}
      />

      {/* Outer ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ filter: isListening ? 'drop-shadow(0 0 10px hsl(180 100% 50% / 0.3))' : 'none' }}
      >
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(280, 100%, 60%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.45}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="1"
          className={isListening ? 'rotate-slow' : ''}
          style={{ transformOrigin: 'center' }}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.18}
          fill="none"
          stroke="hsl(180, 100%, 50%)"
          strokeWidth="2"
          strokeOpacity={0.2 + averageVolume * 0.3}
        />
      </svg>

      {/* Frequency bars */}
      <svg width={size} height={size} className="absolute inset-0">
        <defs>
          {bars.map((bar) => (
            <linearGradient
              key={`gradient-${bar.index}`}
              id={`barGradient-${bar.index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={bar.color} />
              <stop offset="100%" stopColor={bar.glowColor} />
            </linearGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {bars.map((bar) => (
          <line
            key={bar.index}
            x1={bar.x1}
            y1={bar.y1}
            x2={bar.x2}
            y2={bar.y2}
            stroke={`url(#barGradient-${bar.index})`}
            strokeWidth={Math.max(2, 4 - (bars.length > 32 ? 2 : 0))}
            strokeLinecap="round"
            style={{
              filter: bar.intensity > 0.5 ? 'url(#glow)' : 'none',
              transition: 'all 0.05s ease-out',
            }}
          />
        ))}
      </svg>

      {/* Center orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.15,
          height: size * 0.15,
          background: `radial-gradient(circle at 30% 30%, hsl(180 100% 70%), hsl(180 100% 50%), hsl(200 100% 40%))`,
          boxShadow: isListening
            ? `0 0 ${20 + averageVolume * 40}px hsl(180 100% 50% / ${0.4 + averageVolume * 0.4})`
            : '0 0 20px hsl(180 100% 50% / 0.3)',
          transform: `scale(${0.9 + averageVolume * 0.2})`,
          transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        }}
      />

      {/* Volume indicator in center */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-xs font-semibold"
        style={{
          width: size * 0.12,
          height: size * 0.12,
          color: 'hsl(180 100% 90%)',
          textShadow: '0 0 10px hsl(180 100% 50%)',
        }}
      >
        {isListening ? `${Math.round(averageVolume * 100)}%` : '—'}
      </div>
    </div>
  );
};
