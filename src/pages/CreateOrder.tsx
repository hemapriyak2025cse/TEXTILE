import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface CreateOrderProps {
  setCurrentView: (view: string) => void;
}

export const CreateOrder: React.FC<CreateOrderProps> = ({ setCurrentView }) => {
  const { createOrder, t } = useApp();
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState<number>(50);
  const [expectedDate, setExpectedDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      setError('Silk product specification is required.');
      return;
    }
    if (quantity <= 0) {
      setError('Meterage or quantity must be greater than zero.');
      return;
    }
    createOrder({
      productName,
      quantity,
      expectedDeliveryDate: expectedDate || undefined,
      remarks: remarks || undefined
    });
    setCurrentView('owner-orders');
  };

  const sampleProducts = [
    'Kanchipuram Korvai Silk Sari (Pure Gold Zari)',
    'Bridal Muhurtham Pattu with Peacock Butta',
    'Jacquard Handloom Brocade Silk Fabric',
    'Temple Border Veshti & Angavastram Set',
    'Mulberry Raw Silk Kurti Material 40s',
    'Royal Mysore Crepe Silk Sari with Zari Pallu'
  ];

  return (
    <div className="row justify-content-center anim-fade-up">
      <div className="col-lg-9">
        <div className="luxury-header-block">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
                Bespoke Commission Studio
              </span>
              <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
              <span className="text-muted small">Atelier Order Spec</span>
            </div>
            <h2>Commission Silk Collection Order</h2>
            <small>Create an official commercial buyer order or custom silk weaving run</small>
          </div>
          <button
            className="btn btn-luxury-outline"
            onClick={() => setCurrentView('owner-orders')}
          >
            <i className="bi bi-arrow-left me-1"></i> Return to Registry
          </button>
        </div>

        <div className="luxury-card p-4 p-md-5">
          {error && (
            <div
              className="d-flex align-items-center gap-2 p-3 mb-4 rounded-3"
              style={{ background: 'rgba(100, 21, 47, 0.08)', border: '1px solid var(--heritage-burgundy)', color: 'var(--heritage-burgundy)' }}
              role="alert"
            >
              <i className="bi bi-exclamation-circle-fill fs-5"></i>
              <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-luxury-label">Silk Fabric &amp; Weave Specification *</label>
              <input
                type="text"
                className="form-control-luxury"
                required
                placeholder="e.g. Kanchipuram Korvai Silk Sari (Pure Gold Zari)"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <div className="mt-3">
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.06em' }}>
                  Haute Silk Presets:
                </small>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {sampleProducts.map(prod => (
                    <button
                      type="button"
                      key={prod}
                      className="btn btn-sm btn-luxury-outline py-1 px-3"
                      style={{ fontSize: '0.76rem', background: '#FAF7F0' }}
                      onClick={() => setProductName(prod)}
                    >
                      {prod}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-luxury-label">Commission Volume (Saris / Units / Meters) *</label>
                <input
                  type="number"
                  min="1"
                  className="form-control-luxury"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Target Completion &amp; Vault Delivery Date</label>
                <input
                  type="date"
                  className="form-control-luxury"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-luxury-label">Technical Weaving Specifications &amp; Zari Grade</label>
              <textarea
                className="form-control-luxury"
                rows={4}
                placeholder="Specify warp & weft thread counts, silver/gold bullion ratio, Korvai interlock details, petni border motifs, and buyer packaging instructions..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border-gold)' }}>
              <button
                type="button"
                className="btn btn-luxury-outline"
                onClick={() => setCurrentView('owner-orders')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-luxury-gold px-4">
                <i className="bi bi-patch-check me-1"></i> Commission &amp; Route to Loom
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
