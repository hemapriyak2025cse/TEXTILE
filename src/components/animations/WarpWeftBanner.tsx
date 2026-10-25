import React from 'react';

interface WarpWeftBannerProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  loomSpeed?: string;
  children?: React.ReactNode;
}

export const WarpWeftBanner: React.FC<WarpWeftBannerProps> = ({
  title,
  subtitle,
  badgeText = 'TRIZEN INDUSTRIAL INTELLIGENCE',
  loomSpeed = 'Active Looms 98.4%',
  children
}) => {
  return (
    <div 
      className="position-relative p-4 p-md-5 rounded-4 overflow-hidden mb-4 anim-fade-up"
      style={{
        background: 'linear-gradient(135deg, #0A1128 0%, #0E172E 60%, #162444 100%)',
        border: '1px solid rgba(198, 161, 91, 0.35)',
        boxShadow: '0 12px 35px rgba(10, 17, 40, 0.4)',
        color: '#FFFFFF'
      }}
    >
      {/* Background Interwoven Warp & Weft Threads */}
      <svg 
        className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none opacity-25"
        preserveAspectRatio="none"
        viewBox="0 0 1000 300"
      >
        {/* Warp vertical lines */}
        {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950].map((x, i) => (
          <line
            key={`w-${i}`}
            x1={x}
            y1="0"
            x2={x}
            y2="300"
            stroke="#C6A15B"
            strokeWidth="1"
            strokeDasharray="4 8"
            className="thread-dash-animated"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}

        {/* Weft horizontal strands */}
        {[40, 90, 150, 210, 260].map((y, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={y}
            x2="1000"
            y2={y}
            stroke="#38BDF8"
            strokeWidth="1"
            strokeDasharray="8 6"
            className="thread-dash-animated"
            style={{ animationDuration: '4s', animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>

      <div className="position-relative d-flex flex-wrap justify-content-between align-items-center gap-3" style={{ zIndex: 2 }}>
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span 
              className="badge rounded-pill px-3 py-1 text-uppercase"
              style={{
                background: 'rgba(198, 161, 91, 0.2)',
                color: 'var(--champagne)',
                border: '1px solid var(--antique-gold)',
                fontSize: '0.68rem',
                letterSpacing: '0.14em'
              }}
            >
              ✦ {badgeText}
            </span>
            <span 
              className="badge rounded-pill px-2 py-1"
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38BDF8',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontSize: '0.68rem'
              }}
            >
              ● {loomSpeed}
            </span>
          </div>

          <h2 className="brand-font fw-bold text-white mb-1" style={{ fontSize: '1.9rem', letterSpacing: '-0.01em' }}>
            {title}
          </h2>
          <p className="mb-0 text-white-50 small" style={{ maxWidth: '640px', lineHeight: '1.6' }}>
            {subtitle}
          </p>
        </div>

        {children && (
          <div className="d-flex align-items-center gap-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
