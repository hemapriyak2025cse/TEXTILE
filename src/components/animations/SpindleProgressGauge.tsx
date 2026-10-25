import React from 'react';

interface SpindleProgressGaugeProps {
  progress: number; // 0 to 100
  size?: number;
  label?: string;
  sublabel?: string;
  yarnColor?: string;
}

export const SpindleProgressGauge: React.FC<SpindleProgressGaugeProps> = ({
  progress,
  size = 140,
  label = 'Weave Progress',
  sublabel = 'Spindle Speed 840 RPM',
  yarnColor = '#C6A15B'
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div className="d-flex flex-column align-items-center text-center">
      <div 
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Track Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(198, 161, 91, 0.15)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Thread Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={yarnColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 0.85s cubic-bezier(0.2, 0.8, 0.2, 1)',
              filter: `drop-shadow(0 0 6px ${yarnColor})`
            }}
          />
        </svg>

        {/* Center Spindle Core */}
        <div 
          className="position-absolute d-flex flex-column align-items-center justify-content-center"
          style={{ width: size - 36, height: size - 36 }}
        >
          <div 
            className="spindle-spin d-flex align-items-center justify-content-center mb-1"
            style={{ 
              width: '28px', 
              height: '28px',
              border: `1.5px dashed ${yarnColor}`,
              borderRadius: '50%',
              color: yarnColor,
              fontSize: '0.85rem'
            }}
          >
            <i className="bi bi-fan"></i>
          </div>
          <span 
            className="fw-bold font-heading"
            style={{ fontSize: size > 120 ? '1.4rem' : '1.1rem', color: 'var(--midnight)', lineHeight: 1 }}
          >
            {Math.round(progress)}%
          </span>
          <span style={{ fontSize: '0.65rem', color: '#6C7282', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Wound
          </span>
        </div>
      </div>

      <div className="mt-2">
        <div className="fw-semibold text-dark small">{label}</div>
        <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>{sublabel}</small>
      </div>
    </div>
  );
};
