import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TextileThreadFlow } from '../components/animations/TextileThreadFlow';

interface LoginPageProps {
  setCurrentView: (view: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentView }) => {
  const { login, t } = useApp();
  const [username, setUsername] = useState('demo_owner1');
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Generate unique replay key on genuine mount; typing will NEVER change this key
  const [sessionReplayKey, setSessionReplayKey] = useState<number>(() => Date.now());

  // Listen for browser back-forward navigation cache restoration
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setSessionReplayKey(Date.now());
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      setIsLoading(false);
      if (result.success) {
        setCurrentView('dashboard');
      } else {
        setError(result.message || 'Verification failed. Please check credentials.');
      }
    }, 400);
  };

  const handleQuickLogin = (user: string) => {
    setUsername(user);
    setPassword('Demo@123');
    setIsLoading(true);
    setTimeout(() => {
      const result = login(user, 'Demo@123');
      setIsLoading(false);
      if (result.success) {
        setCurrentView('dashboard');
      } else {
        setError(result.message || 'Login failed.');
      }
    }, 300);
  };

  return (
    <div 
      className="position-relative min-vh-100 d-flex align-items-center justify-content-center py-5 overflow-hidden"
      style={{
        background: '#0A1128',
        margin: '-1.5rem -0.75rem' // Expand smoothly across main layout padding
      }}
    >
      {/* Full-Screen Immersive Canvas Weaving Animation (Replays on every genuine visit) */}
      <TextileThreadFlow replayKey={sessionReplayKey} />

      {/* Floating Animated Loom Shuttle Ambient Lighting */}
      <div 
        className="position-absolute top-50 start-50 translate-middle pointer-events-none"
        style={{
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(198, 161, 91, 0.08) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 70%)',
          zIndex: 1,
          animation: 'loomPulse 4s ease-in-out infinite'
        }}
      />

      <div 
        key={`panel-${sessionReplayKey}`}
        className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 position-relative anim-fade-up"
        style={{ zIndex: 10, maxWidth: '520px' }}
      >
        {/* Luxury Frosted Obsidian Panel with Gold Hairline Trims */}
        <div
          className="p-4 p-md-5 rounded-4 position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(14, 23, 46, 0.88) 0%, rgba(10, 17, 40, 0.94) 100%)',
            border: '1px solid rgba(198, 161, 91, 0.45)',
            boxShadow: '0 25px 65px -10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(198, 161, 91, 0.15)',
            backdropFilter: 'blur(20px)',
            color: '#FFFFFF'
          }}
        >
          {/* Luminous Top Fiber Strand Header Accent */}
          <div 
            className="position-absolute top-0 start-0 w-100"
            style={{
              height: '3px',
              background: 'linear-gradient(90deg, transparent 0%, #C6A15B 30%, #38BDF8 70%, transparent 100%)',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.6)'
            }}
          />

          {/* TRIZEN Brand Masthead */}
          <div className="text-center mb-4 pb-1">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow"
              style={{
                width: '64px',
                height: '64px',
                fontSize: '1.9rem',
                background: 'linear-gradient(135deg, #0A1128 0%, #162444 100%)',
                border: '1.5px solid var(--antique-gold)',
                color: 'var(--champagne)',
                boxShadow: '0 0 24px rgba(198, 161, 91, 0.4), inset 0 0 12px rgba(198, 161, 91, 0.25)'
              }}
            >
              <i className="bi bi-bezier2 text-gold"></i>
            </div>
            
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Textile Intelligence Architecture
            </div>
            
            <h1 className="brand-font fw-bold mt-1 mb-1" style={{ fontSize: '2.2rem', color: '#FFFFFF', letterSpacing: '0.04em' }}>
              TRIZEN
            </h1>
            
            <div className="zari-divider">
              ✦ SMART MILL AUTHENTICATION GATEWAY ✦
            </div>
          </div>

          {error && (
            <div
              className="d-flex align-items-center gap-2 p-3 mb-4 rounded-3 anim-fade-up"
              style={{ 
                background: 'rgba(239, 68, 68, 0.12)', 
                border: '1px solid rgba(239, 68, 68, 0.5)', 
                color: '#FCA5A5' 
              }}
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill fs-5"></i>
              <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase mb-1" style={{ color: 'var(--champagne)', letterSpacing: '0.08em', fontSize: '0.74rem' }}>
                Textile Operator or Management ID
              </label>
              <div className="input-group">
                <span 
                  className="input-group-text" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.06)', 
                    borderColor: 'rgba(198, 161, 91, 0.35)', 
                    color: 'var(--antique-gold)' 
                  }}
                >
                  <i className="bi bi-person-badge"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.06)', 
                    borderColor: 'rgba(198, 161, 91, 0.35)', 
                    color: '#FFFFFF',
                    borderLeft: 'none'
                  }}
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. demo_owner1, demo_admin"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-bold text-uppercase mb-0" style={{ color: 'var(--champagne)', letterSpacing: '0.08em', fontSize: '0.74rem' }}>
                  System Security Key
                </label>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none"
                  style={{ color: 'var(--antique-gold-light)', fontSize: '0.76rem', fontWeight: 600 }}
                  onClick={() => setShowForgotModal(true)}
                >
                  Forgot Key?
                </button>
              </div>
              <div className="input-group">
                <span 
                  className="input-group-text" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.06)', 
                    borderColor: 'rgba(198, 161, 91, 0.35)', 
                    color: 'var(--antique-gold)' 
                  }}
                >
                  <i className="bi bi-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.06)', 
                    borderColor: 'rgba(198, 161, 91, 0.35)', 
                    color: '#FFFFFF',
                    borderLeft: 'none'
                  }}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Master passcode"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-luxury-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              style={{ fontSize: '0.98rem', letterSpacing: '0.04em' }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-shield-lock-fill"></i>
                  <span>Enter TRIZEN Platform</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Clearance */}
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.25)' }}>
            <div className="text-center mb-3">
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(230, 213, 173, 0.8)', fontWeight: 600 }}>
                Instant Access Clearance (Passcode: Demo@123)
              </span>
            </div>

            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                className="btn btn-sm d-flex justify-content-between align-items-center p-2 rounded-3 text-start transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(198, 161, 91, 0.3)',
                  color: '#FFFFFF'
                }}
                onClick={() => handleQuickLogin('demo_owner1')}
              >
                <div>
                  <div className="fw-bold" style={{ fontSize: '0.84rem' }}>
                    <i className="bi bi-building me-2 text-gold"></i>
                    Textile Mill Director (demo_owner1)
                  </div>
                  <small style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}>
                    Production batches, floor runs &amp; treasury settlements
                  </small>
                </div>
                <span className="status-pip in-progress" style={{ fontSize: '0.7rem' }}>OWNER</span>
              </button>

              <button
                type="button"
                className="btn btn-sm d-flex justify-content-between align-items-center p-2 rounded-3 text-start transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#FFFFFF'
                }}
                onClick={() => handleQuickLogin('demo_admin')}
              >
                <div>
                  <div className="fw-bold" style={{ fontSize: '0.84rem' }}>
                    <i className="bi bi-shield-check me-2" style={{ color: '#00C9A7' }}></i>
                    Operations Administrator (demo_admin)
                  </div>
                  <small style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}>
                    Workforce clearances, user approvals &amp; audit stream
                  </small>
                </div>
                <span className="status-pip active" style={{ fontSize: '0.7rem', color: '#00C9A7' }}>ADMIN</span>
              </button>

              <button
                type="button"
                className="btn btn-sm d-flex justify-content-between align-items-center p-2 rounded-3 text-start transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#FFFFFF'
                }}
                onClick={() => handleQuickLogin('demo_worker001')}
              >
                <div>
                  <div className="fw-bold" style={{ fontSize: '0.84rem' }}>
                    <i className="bi bi-fan me-2" style={{ color: '#38BDF8' }}></i>
                    Textile Operator (demo_worker001)
                  </div>
                  <small style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}>
                    Machine queues, shift schedules &amp; compensation slips
                  </small>
                </div>
                <span className="status-pip completed" style={{ fontSize: '0.7rem' }}>OPERATOR</span>
              </button>
            </div>
          </div>

          <div className="text-center mt-4 pt-2">
            <p className="small mb-0" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
              New textile facility operator?{' '}
              <button
                className="btn btn-link p-0 text-decoration-none fw-bold"
                style={{ color: 'var(--champagne)', fontSize: '0.86rem' }}
                onClick={() => setCurrentView('register')}
              >
                Request Authorization &rarr;
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(10, 17, 40, 0.85)', backdropFilter: 'blur(10px)', zIndex: 1080 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-2xl" style={{ background: '#0A1128', border: '1px solid var(--border-gold)', color: 'var(--champagne)' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border-gold)' }}>
                <h5 className="modal-title font-heading text-white">Reset Security Access Key</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => { setShowForgotModal(false); setForgotSuccess(false); }}></button>
              </div>
              <div className="modal-body p-4">
                {forgotSuccess ? (
                  <div className="p-3 rounded-3" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981' }}>
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    A secure one-time cryptographic passkey dispatch has been transmitted to <strong>{forgotEmail}</strong>.
                  </div>
                ) : (
                  <div>
                    <p className="text-white-50 small mb-3">
                      Provide your verified TRIZEN organization email address to receive a secure recovery token:
                    </p>
                    <input
                      type="email"
                      className="form-control mb-3"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderColor: 'var(--border-gold)',
                        color: '#FFFFFF'
                      }}
                      placeholder="e.g. operator@trizen.invalid"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                    <button
                      className="btn btn-luxury-gold w-100"
                      onClick={() => {
                        if (forgotEmail) setForgotSuccess(true);
                      }}
                    >
                      Transmit Recovery Token
                    </button>
                  </div>
                )}
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid var(--border-gold)' }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  style={{ color: 'var(--champagne)', borderColor: 'var(--border-gold)' }}
                  onClick={() => { setShowForgotModal(false); setForgotSuccess(false); }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
