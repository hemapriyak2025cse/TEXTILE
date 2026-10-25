import React from 'react';
import { useApp } from '../context/AppContext';

interface WorkerPaymentHistoryProps {
  setCurrentView: (view: string) => void;
}

export const WorkerPaymentHistory: React.FC<WorkerPaymentHistoryProps> = ({ setCurrentView }) => {
  const { currentUser, payments, orders, t } = useApp();

  const myPayments = payments.filter(p => p.workerUsername === currentUser?.username);
  const totalPaid = myPayments.filter(p => p.paymentStatus.toLowerCase() === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingPaid = myPayments.filter(p => p.paymentStatus.toLowerCase() === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Master Artisan Earnings Statement
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Compensation Slips</span>
          </div>
          <h2>Artisan Wages &amp; Settlement Slips</h2>
          <small>Personal earnings records, piece-rate disbursement receipts, and pending factory milestone vouchers</small>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-cash-coin"></i></div>
            <div className="kpi-value">₹{totalPaid.toLocaleString()}</div>
            <div className="kpi-label">Total Settled Wages (Paid)</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Bank Transfer Disbursed</span>
              <span className="fw-semibold text-success">Verified</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-hourglass-split"></i></div>
            <div className="kpi-value">₹{pendingPaid.toLocaleString()}</div>
            <div className="kpi-label">Pending Loom Milestone Wages</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Awaiting Delivery Gate</span>
              <span className="fw-semibold" style={{ color: 'var(--heritage-burgundy)' }}>Scheduled</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-file-earmark-check"></i></div>
            <div className="kpi-value">{myPayments.length}</div>
            <div className="kpi-label">Issued Compensation Vouchers</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Official Payout Slips</span>
              <span className="fw-semibold text-primary">Audited</span>
            </div>
          </div>
        </div>
      </div>

      <div className="luxury-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-gold)' }}>
          <div>
            <h5 className="fw-bold mb-0" style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
              Individual Compensation Statements
            </h5>
            <small className="text-muted">Itemized compensation vouchers issued to your artisan account</small>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--antique-gold-dark)', fontWeight: 600 }}>
            {myPayments.length} Vouchers On Record
          </span>
        </div>

        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Voucher #</th>
                <th>Order Ref</th>
                <th>Payer / Silk Mill</th>
                <th>Disbursed Wage (₹)</th>
                <th>Disbursement Date</th>
                <th>Status</th>
                <th>Milestone Notes</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No payment records found for {currentUser?.username}.
                  </td>
                </tr>
              ) : (
                myPayments.map(p => (
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
                      <span style={{ fontSize: '0.84rem', color: '#6C7282' }}>
                        <i className="bi bi-building me-1" style={{ color: 'var(--antique-gold)' }}></i>
                        {p.ownerUsername}
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold" style={{ color: 'var(--midnight)', fontSize: '1.05rem', fontFamily: 'var(--font-heading)' }}>
                        ₹{p.amount.toLocaleString()}
                      </span>
                    </td>
                    <td><small className="text-muted">{p.paymentDate || '-'}</small></td>
                    <td>
                      <span className={`status-pip ${p.paymentStatus.toLowerCase() === 'paid' ? 'paid' : 'pending'}`}>
                        {p.paymentStatus}
                      </span>
                    </td>
                    <td><small className="text-muted">{p.remarks || '-'}</small></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
