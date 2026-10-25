import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductionOrder } from '../types';

interface ProductionBatchProps {
  setCurrentView: (view: string) => void;
}

export const ProductionBatch: React.FC<ProductionBatchProps> = ({ setCurrentView }) => {
  const { createProductionBatch, workers, t } = useApp();
  const [productName, setProductName] = useState('');
  const [orderNumber, setOrderNumber] = useState(`BATCH-${Date.now().toString().slice(-6)}`);
  const [quantity, setQuantity] = useState<number>(200);
  const [deadline, setDeadline] = useState('');
  const [currentStage, setCurrentStage] = useState<ProductionOrder['currentStage']>('Cutting');
  const [assignedWorker, setAssignedWorker] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      setError('Silk batch description is required.');
      return;
    }
    createProductionBatch({
      productName,
      orderNumber,
      quantity,
      deadline: deadline || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      currentStage,
      status: currentStage === 'Completed' ? 'Completed' : 'In Progress',
      assignedWorker: assignedWorker || null
    });
    setCurrentView('production-tracking');
  };

  return (
    <div className="row justify-content-center anim-fade-up">
      <div className="col-lg-9">
        <div className="luxury-header-block">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
                Handloom Floor Commissioning
              </span>
              <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
              <span className="text-muted small">Weaving Run</span>
            </div>
            <h2>Launch Silk Handloom Batch</h2>
            <small>Initialize a floor production run with stage routing, zari warp assignment, and artisan allocation</small>
          </div>
          <button
            className="btn btn-luxury-outline"
            onClick={() => setCurrentView('production-tracking')}
          >
            <i className="bi bi-arrow-left me-1"></i> Return to Loom Tracking
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
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-luxury-label">Batch Identifier (Loom Run #) *</label>
                <input
                  type="text"
                  className="form-control-luxury"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Silk Fabric Item Description *</label>
                <input
                  type="text"
                  className="form-control-luxury"
                  required
                  placeholder="e.g. Pure Mulberry Brocade Yardage 200m"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Total Units to Weave *</label>
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
                <label className="form-luxury-label">Production Vault Deadline</label>
                <input
                  type="date"
                  className="form-control-luxury"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Initial Weaving Stage Gateway</label>
                <select
                  className="form-select-luxury"
                  value={currentStage}
                  onChange={(e) => setCurrentStage(e.target.value as ProductionOrder['currentStage'])}
                >
                  <option value="Cutting">Cutting &bull; Thread Preparation</option>
                  <option value="Stitching">Stitching &bull; Jacquard Loom Setup</option>
                  <option value="Dyeing">Dyeing &bull; Vat Dyeing</option>
                  <option value="Finishing">Finishing &bull; Korvai Zari Weave</option>
                  <option value="Packing">Packing &bull; Silk Mark Certification</option>
                  <option value="Completed">Completed &bull; Vaulted</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-luxury-label">Initial Master Weaver Allocation</label>
                <select
                  className="form-select-luxury"
                  value={assignedWorker}
                  onChange={(e) => setAssignedWorker(e.target.value)}
                >
                  <option value="">-- Floor Pool (Unassigned) --</option>
                  {workers.map(w => (
                    <option key={w.workerId} value={w.workerName}>
                      {w.workerName} - {w.department} ({w.skill})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border-gold)' }}>
              <button
                type="button"
                className="btn btn-luxury-outline"
                onClick={() => setCurrentView('production-tracking')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-luxury-gold px-4">
                <i className="bi bi-boxes me-1"></i> Authorize &amp; Start Handloom Run
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
