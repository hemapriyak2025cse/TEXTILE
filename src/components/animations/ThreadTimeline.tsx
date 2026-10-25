import React from 'react';

interface TimelineItem {
  id: string | number;
  title: string;
  description: string;
  timestamp: string;
  tag?: string;
  icon?: string;
  status?: 'active' | 'completed' | 'pending' | 'warning';
}

interface ThreadTimelineProps {
  items: TimelineItem[];
  emptyMessage?: string;
  onItemClick?: (item: TimelineItem) => void;
}

export const ThreadTimeline: React.FC<ThreadTimelineProps> = ({
  items,
  emptyMessage = 'No active textile thread dispatches recorded.',
  onItemClick
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-bezier2 fs-2 d-block mb-2 text-gold"></i>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="position-relative ps-4 ps-md-5 my-3">
      {/* Continuous Vertical Traveling Thread Line */}
      <div
        className="position-absolute top-0 bottom-0"
        style={{
          left: '18px',
          width: '2px',
          background: 'linear-gradient(180deg, #C6A15B 0%, #38BDF8 50%, rgba(198, 161, 91, 0.2) 100%)',
          boxShadow: '0 0 8px rgba(56, 189, 248, 0.4)'
        }}
      />

      <div className="d-flex flex-column gap-4">
        {items.map((item, idx) => {
          const isWarning = item.status === 'warning';
          const isCompleted = item.status === 'completed';

          return (
            <div 
              key={item.id} 
              className="position-relative anim-fade-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Illuminated Yarn Knot / Spool Node */}
              <div
                className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  left: '-32px',
                  top: '6px',
                  width: '24px',
                  height: '24px',
                  background: isWarning 
                    ? '#EF4444' 
                    : isCompleted 
                    ? '#10B981' 
                    : 'linear-gradient(135deg, #C6A15B, #0E172E)',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 0 10px rgba(198, 161, 91, 0.6)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem'
                }}
              >
                <i className={`bi ${item.icon || (isCompleted ? 'bi-check' : 'bi-fan')}`}></i>
              </div>

              {/* Event Content Card */}
              <div 
                className="p-3 rounded-3 bg-white transition-all"
                style={{
                  border: '1px solid rgba(198, 161, 91, 0.22)',
                  boxShadow: '0 4px 14px rgba(10, 17, 40, 0.04)',
                  cursor: onItemClick ? 'pointer' : 'default'
                }}
                onClick={() => onItemClick?.(item)}
              >
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-1">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold text-dark font-heading" style={{ fontSize: '0.92rem' }}>
                      {item.title}
                    </span>
                    {item.tag && (
                      <span className="badge rounded-pill bg-light text-secondary border" style={{ fontSize: '0.66rem' }}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <small className="text-muted" style={{ fontSize: '0.74rem' }}>
                    <i className="bi bi-clock me-1 text-gold"></i>
                    {item.timestamp}
                  </small>
                </div>
                <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
