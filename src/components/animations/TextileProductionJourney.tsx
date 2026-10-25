import React from 'react';

interface ProductionStageInfo {
  key: string;
  label: string;
  subtext: string;
  icon: string;
  metric?: string;
}

interface TextileProductionJourneyProps {
  currentStage?: string; // e.g. 'Cutting' | 'Stitching' | 'Dyeing' | 'Finishing' | 'Packing' | 'Completed'
  batchNumber?: string;
  productName?: string;
  interactive?: boolean;
  onSelectStage?: (stageKey: string) => void;
}

export const TEXTILE_STAGES: ProductionStageInfo[] = [
  { key: 'Cutting', label: 'Yarn & Cutting', subtext: 'Pattern Drafting & Fiber Prep', icon: 'bi-scissors', metric: '60s Combed' },
  { key: 'Dyeing', label: 'Dyeing & Vat', subtext: 'Reactive Color Infusion', icon: 'bi-droplet-half', metric: 'Colorfast 4.5' },
  { key: 'Stitching', label: 'Warping & Assembly', subtext: 'High-Tensile Thread Seaming', icon: 'bi-bezier2', metric: '18 SPI Stitch' },
  { key: 'Finishing', label: 'Loom & Finishing', subtext: 'Weave Setting & Bio-Wash', icon: 'bi-gear-wide-connected', metric: '100% Tension' },
  { key: 'Packing', label: 'Inspection & Packing', subtext: 'Optical QC & Carton Sealing', icon: 'bi-box-seam', metric: 'AQL 1.5 Passed' },
  { key: 'Completed', label: 'Completed Fabric', subtext: 'Dispatched to Fleet Logistics', icon: 'bi-check-all', metric: 'Certified Roll' }
];

export const TextileProductionJourney: React.FC<TextileProductionJourneyProps> = ({
  currentStage = 'Dyeing',
  batchNumber = 'BATCH-2026-LIVE',
  productName = 'Premium Textile Assembly',
  interactive = false,
  onSelectStage
}) => {
  const currentIndex = TEXTILE_STAGES.findIndex(
    s => s.key.toLowerCase() === currentStage.toLowerCase()
  );
  const activeIdx = currentIndex >= 0 ? currentIndex : 2;

  // Calculate percentage of progress along the traveling thread
  const progressPercent = Math.round(((activeIdx) / (TEXTILE_STAGES.length - 1)) * 100);

  return (
    <div 
      className="position-relative p-4 rounded-4 overflow-hidden mb-4 anim-fade-up"
      style={{
        background: 'linear-gradient(135deg, #0A1128 0%, #0E172E 50%, #162444 100%)',
        border: '1px solid rgba(198, 161, 91, 0.35)',
        boxShadow: '0 12px 35px rgba(10, 17, 40, 0.45)',
        color: '#FFFFFF'
      }}
    >
      {/* Background Interlocking Yarn Grid */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(198, 161, 91, 0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Telemetry Bar */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 position-relative" style={{ borderBottom: '1px solid rgba(198, 161, 91, 0.25)', zIndex: 2 }}>
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-3 d-flex align-items-center justify-content-center"
            style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, rgba(198, 161, 91, 0.3), rgba(10, 17, 40, 0.8))',
              border: '1px solid var(--antique-gold)',
              boxShadow: '0 0 16px rgba(198, 161, 91, 0.3)'
            }}
          >
            <i className="bi bi-diagram-3-fill text-gold fs-5"></i>
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
                Continuous Textile Manufacturing Journey
              </span>
              <span className="badge rounded-pill bg-dark border border-secondary" style={{ fontSize: '0.66rem' }}>
                {batchNumber}
              </span>
            </div>
            <h5 className="font-heading mb-0 text-white" style={{ letterSpacing: '0.04em' }}>
              {productName}
            </h5>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
          <div className="text-end">
            <small style={{ color: 'var(--champagne)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Thread Traversal Progress
            </small>
            <div className="fw-bold fs-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {progressPercent}% Stage Realized
            </div>
          </div>
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center spindle-spin"
            style={{
              width: '40px',
              height: '40px',
              border: '2px dashed var(--antique-gold)',
              color: 'var(--antique-gold)',
              fontSize: '1.1rem'
            }}
            title="Loom Spindle In Motion"
          >
            <i className="bi bi-fan"></i>
          </div>
        </div>
      </div>

      {/* Connected Textile Production Line with Traveling Thread */}
      <div className="position-relative py-3 px-2 px-md-4" style={{ zIndex: 2 }}>
        {/* Background Connecting Thread (Incomplete) */}
        <div 
          className="position-absolute top-50 start-0 w-100"
          style={{
            height: '3px',
            background: 'rgba(255, 255, 255, 0.12)',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        />

        {/* Active Animated Traveling Thread Line */}
        <div 
          className="position-absolute top-50 start-0"
          style={{
            height: '4px',
            width: `${Math.max(progressPercent, 4)}%`,
            background: 'linear-gradient(90deg, #C6A15B 0%, #E6D5AD 60%, #38BDF8 100%)',
            boxShadow: '0 0 14px rgba(56, 189, 248, 0.8), 0 0 4px #FFFFFF',
            transform: 'translateY(-50%)',
            zIndex: 2,
            transition: 'width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        />

        {/* Traveling Shuttle Node indicator moving along the line */}
        <div
          className="position-absolute top-50"
          style={{
            left: `${progressPercent}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            transition: 'left 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '20px',
              height: '20px',
              background: '#FFFFFF',
              border: '2px solid #38BDF8',
              boxShadow: '0 0 12px #38BDF8',
              animation: 'loomPulse 2s infinite'
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0A1128' }} />
          </div>
        </div>

        {/* Stage Nodes */}
        <div className="d-flex justify-content-between position-relative" style={{ zIndex: 3 }}>
          {TEXTILE_STAGES.map((st, idx) => {
            const isCompleted = idx < activeIdx;
            const isCurrent = idx === activeIdx;
            const isPending = idx > activeIdx;

            return (
              <div 
                key={st.key}
                className="d-flex flex-column align-items-center text-center cursor-pointer"
                style={{
                  width: `${100 / TEXTILE_STAGES.length}%`,
                  cursor: interactive ? 'pointer' : 'default',
                  transition: 'transform 0.25s ease'
                }}
                onClick={() => interactive && onSelectStage?.(st.key)}
              >
                {/* Stage Circular Node */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                  style={{
                    width: isCurrent ? '46px' : '38px',
                    height: isCurrent ? '46px' : '38px',
                    background: isCompleted 
                      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
                      : isCurrent 
                      ? 'linear-gradient(135deg, var(--antique-gold) 0%, #E6D5AD 100%)' 
                      : 'rgba(16, 24, 43, 0.85)',
                    border: isCurrent 
                      ? '3px solid #38BDF8' 
                      : isCompleted 
                      ? '2px solid #34D399' 
                      : '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: isCurrent 
                      ? '0 0 20px rgba(56, 189, 248, 0.8), 0 0 10px rgba(198, 161, 91, 0.6)' 
                      : isCompleted 
                      ? '0 0 10px rgba(52, 211, 153, 0.4)' 
                      : 'none',
                    color: isCurrent ? '#0A1128' : isCompleted ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                    fontSize: isCurrent ? '1.25rem' : '1rem',
                    transition: 'all 0.35s ease'
                  }}
                >
                  <i className={`bi ${isCompleted ? 'bi-check-lg' : st.icon}`}></i>
                </div>

                {/* Stage Text */}
                <div className="d-flex flex-column align-items-center px-1">
                  <span 
                    className="fw-bold mb-1"
                    style={{
                      fontSize: '0.8rem',
                      letterSpacing: '0.02em',
                      color: isCurrent ? 'var(--champagne)' : isCompleted ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {st.label}
                  </span>
                  
                  <span 
                    className="d-none d-md-block text-truncate"
                    style={{
                      fontSize: '0.68rem',
                      color: isCurrent ? '#38BDF8' : 'rgba(255, 255, 255, 0.45)',
                      maxWidth: '120px'
                    }}
                  >
                    {st.subtext}
                  </span>

                  <span 
                    className="badge rounded-pill mt-1"
                    style={{
                      fontSize: '0.62rem',
                      background: isCurrent 
                        ? 'rgba(56, 189, 248, 0.2)' 
                        : isCompleted 
                        ? 'rgba(5, 150, 105, 0.25)' 
                        : 'rgba(255, 255, 255, 0.08)',
                      color: isCurrent ? '#38BDF8' : isCompleted ? '#34D399' : 'rgba(255, 255, 255, 0.4)',
                      border: isCurrent ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent'
                    }}
                  >
                    {isCompleted ? 'Verified' : isCurrent ? 'Active Loom' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
