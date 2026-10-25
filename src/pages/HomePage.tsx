import React from 'react';
import { useApp } from '../context/AppContext';
import { TextileProductionJourney } from '../components/animations/TextileProductionJourney';

interface HomePageProps {
  setCurrentView: (view: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentView }) => {
  const { t, currentUser } = useApp();

  return (
    <div className="anim-fade-up">
      {/* Signature TRIZEN Industrial-Luxury Hero */}
      <section 
        className="luxury-hero-container p-4 p-md-5 mb-5 position-relative overflow-hidden rounded-4"
        style={{
          background: 'linear-gradient(135deg, #0A1128 0%, #0E172E 50%, #162444 100%)',
          border: '1px solid rgba(198, 161, 91, 0.35)',
          boxShadow: '0 20px 50px rgba(10, 17, 40, 0.45)'
        }}
      >
        {/* Animated background yarn threads */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(198, 161, 91, 0.2) 0px, rgba(198, 161, 91, 0.2) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(56, 189, 248, 0.2) 0px, rgba(56, 189, 248, 0.2) 1px, transparent 1px, transparent 20px)'
          }}
        />

        <div className="container position-relative" style={{ zIndex: 3 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-light">
              <div 
                className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-4 rounded-pill"
                style={{ background: 'rgba(198, 161, 91, 0.12)', border: '1px solid var(--border-gold)' }}
              >
                <i className="bi bi-bezier2 text-gold"></i>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--champagne)' }}>
                  Intelligent Textile Manufacturing &amp; Tracking
                </span>
              </div>

              <h1 className="display-4 fw-bold lh-tight mb-3" style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Next-Generation <br />
                <span className="gold-text-shimmer">Textile Operations Architecture</span>
              </h1>

              <p className="lead mt-3" style={{ color: 'rgba(230, 213, 173, 0.9)', maxWidth: '580px', fontSize: '1.05rem', lineHeight: '1.7' }}>
                TRIZEN connects modern textile mills, spinning lines, weaving sheds, apparel manufacturing, and high-speed production tracking into one intelligent, unified operations platform. From fiber selection and continuous yarn routing to finished fabric dispatch.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4 pt-2">
                {currentUser ? (
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="btn btn-luxury-gold d-flex align-items-center gap-2 px-4 py-3"
                  >
                    <i className="bi bi-speedometer2"></i>
                    <span>Enter Production Console</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setCurrentView('login')}
                      className="btn btn-luxury-gold d-flex align-items-center gap-2 px-4 py-3"
                    >
                      <i className="bi bi-box-arrow-in-right"></i>
                      <span>Access TRIZEN Console</span>
                    </button>
                    <button
                      onClick={() => setCurrentView('register')}
                      className="btn btn-luxury-outline d-flex align-items-center gap-2 px-4 py-3"
                      style={{ color: 'var(--champagne)' }}
                    >
                      <i className="bi bi-person-plus"></i>
                      <span>Workforce Registration</span>
                    </button>
                  </>
                )}
              </div>

              {/* Manufacturing Metrics */}
              <div className="d-flex flex-wrap gap-4 mt-5 pt-4" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.2)' }}>
                <div>
                  <div className="fw-bold font-heading" style={{ color: 'var(--champagne)', fontSize: '1.4rem' }}>
                    6-Stage
                  </div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--antique-gold)', textTransform: 'uppercase' }}>
                    Connected Textile Routing
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(198, 161, 91, 0.2)', paddingLeft: '1.25rem' }}>
                  <div className="fw-bold font-heading" style={{ color: 'var(--champagne)', fontSize: '1.4rem' }}>
                    100% Real-Time
                  </div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--antique-gold)', textTransform: 'uppercase' }}>
                    Loom &amp; Batch Telemetry
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(198, 161, 91, 0.2)', paddingLeft: '1.25rem' }}>
                  <div className="fw-bold font-heading" style={{ color: 'var(--champagne)', fontSize: '1.4rem' }}>
                    Multi-Role
                  </div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--antique-gold)', textTransform: 'uppercase' }}>
                    Owner, Worker &amp; Admin
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <div 
                className="position-relative p-3 rounded-4" 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(198, 161, 91, 0.2), rgba(14, 23, 46, 0.8))', 
                  border: '1px solid var(--antique-gold)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)' 
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                  className="img-fluid rounded-4 shadow-2xl"
                  alt="TRIZEN Smart Textile Technology"
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                />
                <div 
                  className="p-3 text-start position-absolute bottom-0 start-0 end-0 m-4 rounded-3" 
                  style={{ background: 'rgba(10, 17, 40, 0.92)', backdropFilter: 'blur(8px)', border: '1px solid var(--border-gold)' }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="text-white fw-bold" style={{ fontSize: '0.9rem', letterSpacing: '0.04em' }}>
                        Automated Jacquard Weft Alignment
                      </div>
                      <small style={{ color: 'var(--antique-gold)', fontSize: '0.75rem' }}>High-Tensile Thread &amp; Optical Quality Inspection</small>
                    </div>
                    <span className="status-pip completed" style={{ color: '#38BDF8', fontSize: '0.75rem' }}>Active Weave</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Textile Manufacturing Journey Demonstration */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <div className="zari-divider">✦ CONTINUOUS TEXTILE MANUFACTURING PIPELINE ✦</div>
          <h2 className="fw-bold" style={{ color: 'var(--midnight)', fontSize: '2.1rem' }}>
            From Raw Fiber to Certified Finished Fabric
          </h2>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem' }}>
            Real-time animated tracking of manufacturing stages across automated and specialized handloom facilities.
          </p>
        </div>

        <TextileProductionJourney 
          currentStage="Dyeing"
          batchNumber="BATCH-2026-LIVE"
          productName="Performance Cotton Oxford Blend (60s Warp)"
        />
      </section>

      {/* Signature Industrial Pillars */}
      <section className="mb-5">
        <div className="text-center mb-5">
          <div className="zari-divider">✦ TRIZEN CORE ARCHITECTURE ✦</div>
          <h3 className="fw-bold" style={{ color: 'var(--midnight)', fontSize: '2rem' }}>
            Precision Industrial Capabilities
          </h3>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem' }}>
            Engineered for high-volume textile mills, modern garment manufacturing units, and integrated apparel supply chains.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="luxury-card p-4 h-100">
              <div className="kpi-icon-wrap kpi-icon-navy">
                <i className="bi bi-box-seam-fill"></i>
              </div>
              <h5 className="font-heading fw-bold mb-2">Raw Material &amp; Yarn Vault</h5>
              <p className="text-muted small" style={{ lineHeight: '1.7' }}>
                Comprehensive tracking of cotton spools, polyester filaments, dye vats, trims, and packaging consumables with automated reorder warnings.
              </p>
              <div className="py-2 px-3 rounded-2 mt-auto" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <small className="fw-semibold text-dark">Real-Time Stock Depletion &bull; Safety Buffer</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="luxury-card p-4 h-100">
              <div className="kpi-icon-wrap kpi-icon-gold">
                <i className="bi bi-diagram-3-fill"></i>
              </div>
              <h5 className="font-heading fw-bold mb-2">6-Stage Floor Routing</h5>
              <p className="text-muted small" style={{ lineHeight: '1.7' }}>
                Seamless batch routing across Cutting, Stitching, Dyeing, Finishing, and Packing with operator assignment and deadline enforcement.
              </p>
              <div className="py-2 px-3 rounded-2 mt-auto" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <small className="fw-semibold text-dark">Stage Gateway Verification &bull; Timeline SLA</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="luxury-card p-4 h-100">
              <div className="kpi-icon-wrap kpi-icon-burgundy">
                <i className="bi bi-people-fill"></i>
              </div>
              <h5 className="font-heading fw-bold mb-2">Workforce &amp; Wages in INR (₹)</h5>
              <p className="text-muted small" style={{ lineHeight: '1.7' }}>
                Operator skill matching, shift allocations, piece-rate compensation, automated payout registers, and verified bank settlement slips.
              </p>
              <div className="py-2 px-3 rounded-2 mt-auto" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <small className="fw-semibold text-dark">Audited Disbursements &bull; Operator Slips</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
