import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';

interface RegisterPageProps {
  setCurrentView: (view: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ setCurrentView }) => {
  const { register, t } = useApp();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    role: 'WORKER' as Role,
    password: 'Demo@123'
  });
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(formData);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="row justify-content-center my-4 anim-fade-up">
      <div className="col-md-10 col-lg-8">
        <div
          className="luxury-card p-4 p-md-5"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F4 100%)',
            border: '1px solid var(--border-gold-strong)',
            boxShadow: 'var(--shadow-luxury-deep)'
          }}
        >
          <div className="text-center mb-4">
            <div
              className="luxury-crest-icon mx-auto mb-3 shadow"
              style={{ width: '56px', height: '56px', fontSize: '1.6rem' }}
            >
              <i className="bi bi-person-badge"></i>
            </div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Silk Guild Registration
            </div>
            <h2 className="brand-font fw-bold mt-1 mb-1" style={{ fontSize: '1.9rem', color: 'var(--midnight)' }}>
              Join the TRIZEN Atelier
            </h2>
            <div className="zari-divider">✦ CRAFTSMANSHIP CREDENTIALS ✦</div>
          </div>

          {statusMessage && (
            <div
              className="p-3 mb-4 rounded-3 d-flex align-items-center gap-3"
              style={{
                background: statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(100, 21, 47, 0.08)',
                border: `1px solid ${statusMessage.type === 'success' ? '#10B981' : 'var(--heritage-burgundy)'}`,
                color: statusMessage.type === 'success' ? '#065F46' : 'var(--heritage-burgundy)'
              }}
            >
              <i className={`bi ${statusMessage.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} fs-5`}></i>
              <div>
                <div className="fw-semibold">{statusMessage.text}</div>
                {statusMessage.type === 'success' && (
                  <button
                    className="btn btn-sm btn-luxury-burgundy mt-2"
                    onClick={() => setCurrentView('login')}
                  >
                    Return to Portal Login &rarr;
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-luxury-label">Artisan Legal Name *</label>
                <input
                  type="text"
                  className="form-control-luxury"
                  required
                  placeholder="e.g. Meenakshi Sundaram"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Desired Guild Handle (Username) *</label>
                <input
                  type="text"
                  className="form-control-luxury"
                  required
                  placeholder="e.g. sundaram_weaver"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Official Email Contact *</label>
                <input
                  type="email"
                  className="form-control-luxury"
                  required
                  placeholder="e.g. sundaram@kanchisilk.invalid"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Primary Mobile Phone *</label>
                <input
                  type="text"
                  className="form-control-luxury"
                  required
                  placeholder="e.g. +91 94432 10987"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Atelier Persona *</label>
                <select
                  className="form-select-luxury"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                >
                  <option value="WORKER">Master Weaver / Floor Artisan</option>
                  <option value="OWNER">Silk Mill / Loom Proprietor</option>
                </select>
                <small className="text-muted d-block mt-1" style={{ fontSize: '0.74rem' }}>
                  Clearance level will be assigned upon administrator vetting.
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Master Passkey *</label>
                <input
                  type="password"
                  className="form-control-luxury"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="col-12">
                <label className="form-luxury-label">Weaving Loft / Factory Address</label>
                <textarea
                  className="form-control-luxury"
                  rows={2}
                  placeholder="e.g. Loom Shed #4, Gandhi Road, Kanchipuram, Tamil Nadu"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div
              className="p-3 my-4 rounded-3 d-flex align-items-center gap-3"
              style={{ background: 'rgba(198, 161, 91, 0.08)', border: '1px solid var(--border-gold)' }}
            >
              <i className="bi bi-info-circle-fill fs-5" style={{ color: 'var(--antique-gold)' }}></i>
              <div className="small text-muted" style={{ lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--midnight)' }}>Imperial Guild Protocol:</strong> Registrations undergo administrative verification before clearance is authorized. You will receive notification once access is granted.
              </div>
            </div>

            <button type="submit" className="btn btn-luxury-burgundy w-100 py-3 d-flex align-items-center justify-content-center gap-2">
              <i className="bi bi-patch-check"></i>
              <span>Submit Registration to Guild</span>
            </button>
          </form>

          <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-gold)' }}>
            <p className="text-muted small mb-0">
              Already possess clearance credentials?{' '}
              <button
                className="btn btn-link p-0 text-decoration-none fw-bold"
                style={{ color: 'var(--antique-gold-dark)', fontSize: '0.86rem' }}
                onClick={() => setCurrentView('login')}
              >
                Sign In to Portal &rarr;
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
