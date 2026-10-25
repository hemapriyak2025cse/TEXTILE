import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductionOrder } from '../types';

interface ProductionTrackingProps {
  setCurrentView: (view: string) => void;
}

const PROCESS_STAGES: { key: ProductionOrder['currentStage']; label: string; sub: string; icon: string }[] = [
  { key: 'Cutting', label: 'Yarn Prep & Cutting', sub: 'Pattern Drafting & Fiber Prep', icon: 'bi-scissors' },
  { key: 'Stitching', label: 'Warping & Assembly', sub: 'High-Tensile Thread Seaming', icon: 'bi-bezier2' },
  { key: 'Dyeing', label: 'Dyeing & Vat', sub: 'Reactive Color Infusion', icon: 'bi-droplet-half' },
  { key: 'Finishing', label: 'Loom & Finishing', sub: 'Weave Setting & Bio-Wash', icon: 'bi-gear-wide-connected' },
  { key: 'Packing', label: 'Inspection & Packing', sub: 'Optical QC & Carton Sealing', icon: 'bi-box-seam' },
  { key: 'Completed', label: 'Completed Fabric', sub: 'Certified Roll Dispatch', icon: 'bi-check-all' }
];

export const ProductionTracking: React.FC<ProductionTrackingProps> = ({ setCurrentView }) => {
  const { productionOrders, workers, updateProductionStage, assignWorkerToBatch, t } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [assigningBatch, setAssigningBatch] = useState<number | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const totalBatches = productionOrders.length;
  const pendingBatches = productionOrders.filter(b => b.status === 'Pending').length;
  const inProgressBatches = productionOrders.filter(b => b.status === 'In Progress').length;
  const completedBatches = productionOrders.filter(b => b.status === 'Completed').length;

  const filteredBatches = productionOrders.filter(b => {
    if (filterStatus === 'ALL') return true;
    return b.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleStageChange = (orderId: number, nextStage: ProductionOrder['currentStage']) => {
    updateProductionStage(orderId, nextStage);
    setSuccessMsg(`Production Batch #${orderId} progressed to '${nextStage}'`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAssignWorker = (orderId: number) => {
    if (!selectedWorker) return;
    assignWorkerToBatch(orderId, selectedWorker);
    setSuccessMsg(`Allocated Operator ${selectedWorker} to Production Batch #${orderId}`);
    setAssigningBatch(null);
    setSelectedWorker('');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const getStageIndex = (stage: ProductionOrder['currentStage']) => {
    return PROCESS_STAGES.findIndex(s => s.key === stage);
  };

  return (
    <div className="anim-fade-up">
      {/* Topbar */}
      <div className="luxury-header-block flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              TRIZEN Industrial Pipeline Telemetry
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">6 Sequential Manufacturing Checkpoints</span>
          </div>
          <h2>Continuous Textile Production Journey</h2>
          <small>
            Real-time tracking of fiber transformation: Yarn Preparation &rarr; Dyeing &rarr; Warping &rarr; Loom / Weaving &rarr; Finishing &rarr; Completed Fabric.
          </small>
        </div>
        <button
          className="btn btn-luxury-gold d-flex align-items-center gap-2"
          onClick={() => setCurrentView('production-batch')}
        >
          <i className="bi bi-boxes"></i>
          <span>Launch Production Batch</span>
        </button>
      </div>

      {successMsg && (
        <div
          className="d-flex align-items-center gap-2 p-3 mb-4 rounded-3 anim-fade-up"
          style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10B981', color: '#065F46' }}
        >
          <i className="bi bi-check-circle-fill fs-5"></i>
          <div className="fw-semibold" style={{ fontSize: '0.88rem' }}>{successMsg}</div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setFilterStatus('ALL')}>
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-boxes"></i></div>
            <div className="kpi-value">{totalBatches}</div>
            <div className="kpi-label">Total Floor Batches</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setFilterStatus('Pending')}>
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-clock-history"></i></div>
            <div className="kpi-value">{pendingBatches}</div>
            <div className="kpi-label">Pending Loom Allocation</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setFilterStatus('In Progress')}>
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-gear-wide-connected"></i></div>
            <div className="kpi-value">{inProgressBatches}</div>
            <div className="kpi-label">Active on Machine Lines</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setFilterStatus('Completed')}>
            <div className="kpi-icon-wrap kpi-icon-charcoal"><i className="bi bi-patch-check"></i></div>
            <div className="kpi-value">{completedBatches}</div>
            <div className="kpi-label">QC Certified &amp; Dispatched</div>
          </div>
        </div>
      </div>

      {/* Batches with Animated Visual Connected Stages */}
      <div className="luxury-card p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid var(--border-gold)' }}>
          <div>
            <h5 className="fw-bold mb-0 font-heading" style={{ color: 'var(--midnight)' }}>
              Active Floor Manufacturing Runs ({filteredBatches.length})
            </h5>
            <small className="text-muted">Interactive 6-step progress pipeline with stage advance controls</small>
          </div>
          <div className="d-flex gap-2">
            {['ALL', 'Pending', 'In Progress', 'Completed'].map(st => (
              <button
                key={st}
                className={`btn btn-sm ${filterStatus === st ? 'btn-luxury-burgundy' : 'btn-luxury-outline'}`}
                onClick={() => setFilterStatus(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="d-flex flex-column gap-4">
          {filteredBatches.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
              No production runs match the selected filter.
            </div>
          ) : (
            filteredBatches.map(batch => {
              const currentIdx = getStageIndex(batch.currentStage);
              const nextStageObj = PROCESS_STAGES[currentIdx + 1];
              const progressPercentage = Math.round((currentIdx / (PROCESS_STAGES.length - 1)) * 100);

              return (
                <div
                  key={batch.orderId}
                  className="p-4 rounded-4 transition-all"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-gold)',
                    boxShadow: '0 4px 16px rgba(10, 17, 40, 0.05)'
                  }}
                >
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                    <div>
                      <div className="d-flex align-items-center gap-3">
                        <h5 className="fw-bold mb-0 font-heading" style={{ color: 'var(--midnight)', fontSize: '1.25rem' }}>
                          {batch.productName}
                        </h5>
                        <code style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)', color: 'var(--midnight)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {batch.orderNumber}
                        </code>
                        <span className={`status-pip ${batch.status === 'Completed' ? 'completed' : 'in-progress'}`}>
                          {batch.status}
                        </span>
                      </div>
                      <div className="text-muted small mt-2 d-flex align-items-center gap-2">
                        <span>Batch Size: <strong className="text-dark">{batch.quantity.toLocaleString()} units</strong></span>
                        <span>&bull;</span>
                        <span>Target Deadline: <strong className="text-dark">{batch.deadline}</strong></span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {batch.assignedWorker ? (
                        <div
                          className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                          style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)', fontSize: '0.82rem' }}
                        >
                          <i className="bi bi-person-circle" style={{ color: 'var(--antique-gold)' }}></i>
                          <span>Operator: <strong>{batch.assignedWorker}</strong></span>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-luxury-outline"
                          onClick={() => {
                            setAssigningBatch(batch.orderId);
                            setSelectedWorker(workers[0]?.workerName || '');
                          }}
                        >
                          <i className="bi bi-person-plus me-1"></i> Allocate Operator
                        </button>
                      )}

                      {nextStageObj && (
                        <button
                          className="btn btn-sm btn-luxury-gold d-flex align-items-center gap-1"
                          onClick={() => handleStageChange(batch.orderId, nextStageObj.key)}
                        >
                          <span>Advance to {nextStageObj.key}</span>
                          <i className="bi bi-arrow-right-short fs-5"></i>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Connected Thread Stage Journey with Traveling Line */}
                  <div className="p-3 my-3 rounded-4 position-relative overflow-hidden" style={{ background: '#FAF8F4', border: '1px solid rgba(198, 161, 91, 0.2)' }}>
                    {/* Background connector line */}
                    <div 
                      className="position-absolute top-50 start-0 w-100"
                      style={{ height: '3px', background: 'rgba(198, 161, 91, 0.15)', transform: 'translateY(-50%)', zIndex: 1 }}
                    />
                    {/* Active thread line */}
                    <div 
                      className="position-absolute top-50 start-0"
                      style={{ 
                        height: '3px', 
                        width: `${progressPercentage}%`, 
                        background: 'linear-gradient(90deg, #C6A15B 0%, #38BDF8 100%)', 
                        boxShadow: '0 0 8px rgba(56, 189, 248, 0.6)',
                        transform: 'translateY(-50%)', 
                        zIndex: 2,
                        transition: 'width 0.6s ease'
                      }}
                    />

                    <div className="silk-stepper-wrap position-relative" style={{ zIndex: 3 }}>
                      {PROCESS_STAGES.map((stage, idx) => {
                        const isCompleted = idx < currentIdx || batch.currentStage === 'Completed';
                        const isCurrent = idx === currentIdx && batch.currentStage !== 'Completed';

                        return (
                          <div
                            key={stage.key}
                            className={`silk-stepper-node ${isCompleted ? 'completed' : isCurrent ? 'active' : ''}`}
                            onClick={() => handleStageChange(batch.orderId, stage.key)}
                            title={`Click to set status to ${stage.label}`}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="silk-stepper-circle">
                              {isCompleted ? <i className="bi bi-check-lg" style={{ color: 'var(--champagne)' }}></i> : idx + 1}
                            </div>
                            <div className="silk-stepper-label">{stage.key}</div>
                            <small className="text-muted d-none d-md-block" style={{ fontSize: '0.68rem', textAlign: 'center' }}>
                              {stage.sub}
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operational Controls Bar */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pt-2" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                        Direct Gateway Override:
                      </small>
                      <select
                        className="form-select form-select-sm"
                        style={{ width: 'auto', background: '#FFFFFF', borderColor: 'var(--border-gold)', fontSize: '0.84rem' }}
                        value={batch.currentStage}
                        onChange={(e) => handleStageChange(batch.orderId, e.target.value as ProductionOrder['currentStage'])}
                      >
                        {PROCESS_STAGES.map(st => (
                          <option key={st.key} value={st.key}>{st.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <span className="text-muted small">Status:</span>
                      <select
                        className="form-select form-select-sm"
                        style={{ width: 'auto', background: '#FFFFFF', borderColor: 'var(--border-gold)', fontSize: '0.84rem' }}
                        value={batch.status}
                        onChange={(e) => {
                          handleStageChange(batch.orderId, batch.currentStage);
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Assign Operator Modal inline */}
                  {assigningBatch === batch.orderId && (
                    <div className="mt-3 p-3 rounded-3" style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)' }}>
                      <div className="d-flex flex-wrap align-items-center gap-3">
                        <label className="fw-semibold text-dark small mb-0">Select Machine Operator:</label>
                        <select
                          className="form-select form-select-sm w-auto"
                          value={selectedWorker}
                          onChange={(e) => setSelectedWorker(e.target.value)}
                        >
                          {workers.map(w => (
                            <option key={w.workerId} value={w.workerName}>
                              {w.workerName} ({w.department} - {w.skill})
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn btn-sm btn-luxury-gold"
                          onClick={() => handleAssignWorker(batch.orderId)}
                        >
                          Confirm Assignment
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => setAssigningBatch(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
