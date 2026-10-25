import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface PaymentTrackingProps {
  setCurrentView: (view: string) => void;
}

export const PaymentTracking: React.FC<PaymentTrackingProps> = ({ setCurrentView }) => {
  const { payments, orders, workers, createPayment, updatePaymentStatus, currentUser, t } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | ''>('');
  const [selectedWorker, setSelectedWorker] = useState('');
  const [amount, setAmount] = useState<number>(8500);
  const [remarks, setRemarks] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const ownerPayments = payments.filter(p => p.ownerUsername === currentUser?.username || currentUser?.role === 'ADMIN');
  const totalPaid = ownerPayments.filter(p => p.paymentStatus.toLowerCase() === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalUnpaid = ownerPayments.filter(p => p.paymentStatus.toLowerCase() === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId || !selectedWorker || amount <= 0) return;
    createPayment(Number(selectedOrderId), selectedWorker, amount, remarks);
    setSuccessMsg(`Disbursement voucher of ₹${amount.toLocaleString()} created for Order #${selectedOrderId}`);
    setShowCreateModal(false);
    setSelectedOrderId('');
    setSelectedWorker('');
    setAmount(8500);
    setRemarks('');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleToggleStatus = (paymentId: number, currentStatus: string) => {
    const nextStatus = currentStatus.toLowerCase() === 'paid' ? 'Pending' : 'Paid';
    updatePaymentStatus(paymentId, nextStatus);
    setSuccessMsg(`Disbursement voucher #${paymentId} marked as ${nextStatus}`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Royal Treasury &amp; Artisan Compensation
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Financial Ledger</span>
          </div>
          <h2>Artisan Payouts &amp; Wage Settlements</h2>
          <small>Audit handloom weaver compensation, milestone advances, piece-rate wages, and commercial accounts</small>
        </div>
        <button
          className="btn btn-luxury-gold d-flex align-items-center gap-2"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="bi bi-cash-stack"></i>
          <span>Record Wage Disbursement</span>
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

      {/* Financial KPI Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold">
              <i className="bi bi-check2-circle"></i>
            </div>
            <div className="kpi-value">₹{totalPaid.toLocaleString()}</div>
            <div className="kpi-label">Settled Artisan Disbursements (Paid)</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Verified Bank Transfer</span>
              <span className="fw-semibold text-success">Confirmed</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy">
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div className="kpi-value">₹{totalUnpaid.toLocaleString()}</div>
            <div className="kpi-label">Pending Loom Payouts (Milestone)</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Awaiting QC Gateway</span>
              <span className="fw-semibold" style={{ color: 'var(--heritage-burgundy)' }}>Scheduled</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy">
              <i className="bi bi-wallet2"></i>
            </div>
            <div className="kpi-value">₹{(totalPaid + totalUnpaid).toLocaleString()}</div>
            <div className="kpi-label">Cumulative Wage Obligations</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>{ownerPayments.length} Total Slips</span>
              <span className="fw-semibold text-primary">Audited</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="luxury-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3" style={{ borderBottom: '1px solid var(--border-gold)' }}>
          <div>
            <h5 className="fw-bold mb-0" style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
              Disbursement Slips &amp; Compensation Records
            </h5>
            <small className="text-muted">Itemized compensation vouchers issued to master weavers and cutting operators</small>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--antique-gold-dark)', fontWeight: 600 }}>
            {ownerPayments.length} Vouchers
          </span>
        </div>

        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Voucher #</th>
                <th>Order Ref</th>
                <th>Payee Artisan</th>
                <th>Disbursed Amount</th>
                <th>Settlement Date</th>
                <th>Notes / Milestone</th>
                <th>Status</th>
                <th>Ledger Operations</th>
              </tr>
            </thead>
            <tbody>
              {ownerPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-5">No disbursement vouchers recorded.</td>
                </tr>
              ) : (
                ownerPayments.map(p => (
                  <tr key={p.paymentId}>
                    <td>
                      <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
                        VOC-{p.paymentId}
                      </strong>
                    </td>
                    <td>
                      <code style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)', color: 'var(--midnight)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                        Order #{p.orderId}
                      </code>
                    </td>
                    <td>
                      <span className="fw-semibold" style={{ color: 'var(--midnight)' }}>
                        <i className="bi bi-person me-1 text-secondary"></i>
                        {p.workerUsername}
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold" style={{ color: 'var(--midnight)', fontSize: '1.05rem', fontFamily: 'var(--font-heading)' }}>
                        ₹{p.amount.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">{p.paymentDate || '-'}</small>
                    </td>
                    <td>
                      <small className="text-muted">{p.remarks || '-'}</small>
                    </td>
                    <td>
                      <span className={`status-pip ${p.paymentStatus.toLowerCase() === 'paid' ? 'paid' : 'pending'}`}>
                        {p.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${p.paymentStatus.toLowerCase() === 'paid' ? 'btn-luxury-outline' : 'btn-luxury-gold'}`}
                        style={{ fontSize: '0.78rem', padding: '4px 12px' }}
                        onClick={() => handleToggleStatus(p.paymentId, p.paymentStatus)}
                      >
                        {p.paymentStatus.toLowerCase() === 'paid' ? 'Mark Pending' : 'Mark as Settled'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(10, 13, 22, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1080 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-2xl" style={{ background: '#FFFFFF', border: '1px solid var(--border-gold)' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border-gold)' }}>
                <h5 className="modal-title brand-font" style={{ color: 'var(--midnight)' }}>
                  Record Artisan Wage Disbursement
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-luxury-label">Related Silk Commission Order *</label>
                    <select
                      className="form-select-luxury"
                      required
                      value={selectedOrderId}
                      onChange={(e) => {
                        const oid = Number(e.target.value);
                        setSelectedOrderId(oid);
                        const match = orders.find(o => o.id === oid);
                        if (match?.workerUsername) setSelectedWorker(match.workerUsername);
                      }}
                    >
                      <option value="">-- Select Order --</option>
                      {orders.map(o => (
                        <option key={o.id} value={o.id}>
                          Order #{o.id} - {o.productName} ({o.quantity} pcs) [{o.status}]
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Payee Master Weaver *</label>
                    <select
                      className="form-select-luxury"
                      required
                      value={selectedWorker}
                      onChange={(e) => setSelectedWorker(e.target.value)}
                    >
                      <option value="">-- Select Artisan --</option>
                      {workers.map(w => (
                        <option key={w.workerId} value={w.workerName}>
                          {w.workerName} - {w.department} ({w.skill})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Disbursement Compensation Amount (₹) *</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control-luxury"
                      required
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Disbursement Notes / Milestone Reason</label>
                    <input
                      type="text"
                      className="form-control-luxury"
                      placeholder="e.g. Korvai Zari Weaving Stage Completion"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTop: '1px solid var(--border-gold)' }}>
                  <button type="button" className="btn btn-luxury-outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Authorize Disbursement Voucher
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
