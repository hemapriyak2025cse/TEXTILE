import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface ProfilePageProps {
  setCurrentView: (view: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ setCurrentView }) => {
  const { currentUser, resetToDefaultData, t } = useApp();
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="text-center py-5 anim-fade-up">
        <div 
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{ width: '70px', height: '70px', background: 'rgba(198, 161, 91, 0.15)', border: '1px solid var(--antique-gold)' }}
        >
          <i className="bi bi-shield-lock fs-2 text-gold"></i>
        </div>
        <h4 className="font-heading mb-2">Guild Authentication Required</h4>
        <p className="text-muted small mb-4">Please sign in to access your master artisan credentials and provenance seals.</p>
        <button className="btn-luxury-gold" onClick={() => setCurrentView('login')}>
          Sign In to Atelier Console
        </button>
      </div>
    );
  }

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to clean synthetic database state?')) {
      resetToDefaultData();
      setResetNotice('System database restored to original seed state.');
      setTimeout(() => setResetNotice(null), 3500);
    }
  };

  return (
    <div className="row justify-content-center anim-fade-up">
      <div className="col-lg-10 col-xl-9">
        {/* Header */}
        <div className="luxury-header-block flex-wrap gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span style={{ color: 'var(--antique-gold)', fontSize: '0.9rem' }}>✦ GUILD PROVENANCE &amp; CREDENTIALS</span>
              <span className="status-pip completed">Authenticated</span>
            </div>
            <h2>Artisan Credentials &amp; Security Dossier</h2>
            <small>Personal identification, handloom authorization level, and atelier system preferences</small>
          </div>
          <div>
            <button 
              className="btn-luxury-outline d-flex align-items-center gap-2 text-decoration-none"
              onClick={() => setCurrentView('dashboard')}
            >
              <i className="bi bi-arrow-left"></i>
              <span>Back to Console</span>
            </button>
          </div>
        </div>

        {resetNotice && (
          <div 
            className="p-3 mb-4 rounded-3 d-flex align-items-center gap-3 anim-fade-up"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 24, 43, 0.95), rgba(10, 13, 22, 0.98))',
              border: '1px solid var(--antique-gold)',
              color: 'var(--champagne)',
              boxShadow: 'var(--shadow-luxury)'
            }}
          >
            <div 
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: '36px', height: '36px', background: 'rgba(198, 161, 91, 0.2)', border: '1px solid var(--antique-gold)' }}
            >
              <i className="bi bi-arrow-counterclockwise text-gold"></i>
            </div>
            <div>
              <div className="fw-semibold text-white">{resetNotice}</div>
              <small style={{ color: 'var(--champagne)', opacity: 0.8 }}>Synthetic records, orders, and payment ledgers have been re-seeded.</small>
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="luxury-card p-4 p-md-5 mb-4">
          {/* Identity Crest Banner */}
          <div className="d-flex flex-wrap align-items-center gap-4 mb-4 pb-4 border-bottom border-light">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: '84px',
                height: '84px',
                fontSize: '32px',
                fontWeight: 'bold',
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, var(--heritage-burgundy) 0%, var(--midnight) 100%)',
                color: 'var(--champagne)',
                border: '2px solid var(--antique-gold)',
                boxShadow: '0 8px 24px rgba(100, 21, 47, 0.35)'
              }}
            >
              {currentUser.fullName.charAt(0)}
            </div>

            <div className="flex-grow-1">
              <div className="d-flex flex-wrap align-items-center gap-3 mb-1">
                <h3 className="font-heading mb-0 text-dark" style={{ letterSpacing: '0.03em' }}>
                  {currentUser.fullName}
                </h3>
                <span className="status-pip completed">
                  {currentUser.role === 'OWNER' ? 'Proprietor & Atelier Patron' : currentUser.role === 'ADMIN' ? 'Imperial Administrator' : 'Master Artisan & Weaver'}
                </span>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-3 text-muted small mt-2">
                <span>
                  <i className="bi bi-person-badge text-gold me-1"></i>
                  Handle: <strong className="text-dark">@{currentUser.username}</strong>
                </span>
                <span>
                  <i className="bi bi-shield-check text-gold me-1"></i>
                  Clearance: <strong className="text-dark">{currentUser.role} Tier</strong>
                </span>
                {currentUser.approved && (
                  <span className="text-success fw-semibold">
                    <i className="bi bi-patch-check-fill me-1"></i>
                    TRIZEN Clearance Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-3 rounded-3" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <label className="text-muted small text-uppercase fw-bold d-block mb-1" style={{ letterSpacing: '0.06em', fontSize: '0.74rem' }}>
                  Legal Executive / Operator Name
                </label>
                <div className="fw-bold text-dark fs-6 font-heading">{currentUser.fullName}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded-3" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <label className="text-muted small text-uppercase fw-bold d-block mb-1" style={{ letterSpacing: '0.06em', fontSize: '0.74rem' }}>
                  Platform Access Username
                </label>
                <div className="fw-bold text-dark fs-6 font-heading">@{currentUser.username}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded-3" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <label className="text-muted small text-uppercase fw-bold d-block mb-1" style={{ letterSpacing: '0.06em', fontSize: '0.74rem' }}>
                  Registered Correspondence Email
                </label>
                <div className="fw-bold text-dark fs-6">{currentUser.email}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded-3" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <label className="text-muted small text-uppercase fw-bold d-block mb-1" style={{ letterSpacing: '0.06em', fontSize: '0.74rem' }}>
                  Telecommunications Line
                </label>
                <div className="fw-bold text-dark fs-6">{currentUser.phone || '+91 90000 00001'}</div>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 rounded-3" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <label className="text-muted small text-uppercase fw-bold d-block mb-1" style={{ letterSpacing: '0.06em', fontSize: '0.74rem' }}>
                  Designated Manufacturing Facility / Mill Address
                </label>
                <div className="fw-bold text-dark fs-6">
                  {currentUser.address || 'Tirupur Textile Manufacturing Corridor, Avinashi Road Unit #4, Tamil Nadu, India'}
                </div>
              </div>
            </div>
          </div>

          {/* Provenance & Authenticity Seal */}
          <div 
            className="mt-4 p-3 rounded-3 d-flex flex-wrap align-items-center justify-content-between gap-3"
            style={{ 
              background: 'linear-gradient(90deg, rgba(10, 17, 40, 0.04) 0%, rgba(198, 161, 91, 0.08) 100%)',
              border: '1px solid var(--border-gold)' 
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '42px', height: '42px', background: 'var(--midnight)', color: 'var(--champagne)', border: '1px solid var(--antique-gold)' }}
              >
                <i className="bi bi-award fs-5 text-gold"></i>
              </div>
              <div>
                <div className="fw-bold text-dark small">TRIZEN Industrial Quality &amp; Precision Weaving Standard</div>
                <div className="text-muted" style={{ fontSize: '0.78rem' }}>Authenticated Machine Telemetry &amp; Workforce Operations Platform</div>
              </div>
            </div>
            <span className="status-pip completed">Registered Plant #TRI-OPS-2026</span>
          </div>

          {/* Factory Seed Reset Section */}
          <div className="mt-5 pt-4 border-top border-light d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h6 className="font-heading mb-1 text-dark">Interactive Dataset Administration</h6>
              <p className="text-muted small mb-0">
                Restore synthetic orders, artisan rosters, and inventory back to default demo state if desired.
              </p>
            </div>
            <button
              className="btn-luxury-outline d-flex align-items-center gap-2"
              onClick={handleReset}
            >
              <i className="bi bi-arrow-counterclockwise text-gold"></i>
              <span>Restore Demo Database</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
