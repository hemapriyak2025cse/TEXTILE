import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface WorkerOrdersProps {
  setCurrentView: (view: string) => void;
}

export const WorkerOrders: React.FC<WorkerOrdersProps> = ({ setCurrentView }) => {
  const { currentUser, orders, workerAcceptOrder, workerRejectOrder, workerUpdateOrderDate, workerCompleteOrder, t } = useApp();
  const [dateModalOrder, setDateModalOrder] = useState<number | null>(null);
  const [expectedDate, setExpectedDate] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const myOrders = orders.filter(o => o.workerUsername === currentUser?.username);
  const total = myOrders.length;
  const pending = myOrders.filter(o => o.status.toUpperCase() === 'PENDING').length;
  const inProgress = myOrders.filter(o => o.status.toUpperCase() === 'IN PROGRESS' || o.status.toUpperCase() === 'ACCEPTED').length;
  const completed = myOrders.filter(o => o.status.toUpperCase() === 'COMPLETED').length;

  const handleAccept = (id: number) => {
    workerAcceptOrder(id);
    setSuccessMsg(`Commission Order #${id} accepted into loom schedule.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleReject = (id: number) => {
    workerRejectOrder(id);
    setSuccessMsg(`Commission Order #${id} returned to proprietor pool.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleComplete = (id: number) => {
    workerCompleteOrder(id);
    setSuccessMsg(`Commission Order #${id} completed & sealed for Silk Mark inspection.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleDateSave = (id: number) => {
    if (!expectedDate) return;
    workerUpdateOrderDate(id, expectedDate);
    setSuccessMsg(`Completion schedule set to ${expectedDate} for Order #${id}`);
    setDateModalOrder(null);
    setExpectedDate('');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Assigned Bespoke Weaves
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Buyer Commissions</span>
          </div>
          <h2>My Assigned Production Orders</h2>
          <small>Review buyer orders, accept weaving commitments, update target completion dates, and seal deliveries</small>
        </div>
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
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-box-seam"></i></div>
            <div className="kpi-value">{total}</div>
            <div className="kpi-label">Assigned Orders</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-hourglass-split"></i></div>
            <div className="kpi-value">{pending}</div>
            <div className="kpi-label">Pending Loom Acceptance</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-gear-wide-connected"></i></div>
            <div className="kpi-value">{inProgress}</div>
            <div className="kpi-label">Active on Handlooms</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-charcoal"><i className="bi bi-patch-check"></i></div>
            <div className="kpi-value">{completed}</div>
            <div className="kpi-label">Completed &amp; Sealed</div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="luxury-card p-4">
        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Silk Product Specifications</th>
                <th>Quantity</th>
                <th>Commission Date</th>
                <th>Target Delivery</th>
                <th>Mill Proprietor</th>
                <th>Status</th>
                <th>Artisan Actions</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No customer orders currently assigned to your craftsmanship.
                  </td>
                </tr>
              ) : (
                myOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>#{order.id}</strong>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{order.productName}</div>
                      {order.remarks && <small className="text-muted d-block">{order.remarks}</small>}
                    </td>
                    <td><span className="fw-bold">{order.quantity} pcs</span></td>
                    <td><small className="text-muted">{order.requestDate || '-'}</small></td>
                    <td>
                      {order.expectedDeliveryDate ? (
                        <span className="fw-medium" style={{ color: 'var(--royal-navy)' }}>
                          <i className="bi bi-calendar-check me-1" style={{ color: 'var(--antique-gold)' }}></i>
                          {order.expectedDeliveryDate}
                        </span>
                      ) : (
                        <span className="text-warning small" style={{ fontStyle: 'italic' }}>Schedule pending</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.84rem', color: '#6C7282' }}>
                        <i className="bi bi-building me-1" style={{ color: 'var(--antique-gold)' }}></i>
                        {order.ownerUsername}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-pip ${
                          order.status === 'Completed'
                            ? 'completed'
                            : order.status === 'Accepted' || order.status === 'IN PROGRESS'
                            ? 'in-progress'
                            : order.status === 'Rejected'
                            ? 'rejected'
                            : 'pending'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        {order.status.toUpperCase() === 'PENDING' && (
                          <>
                            <button
                              className="btn btn-sm btn-luxury-gold py-1 px-2"
                              style={{ fontSize: '0.78rem' }}
                              onClick={() => handleAccept(order.id)}
                            >
                              <i className="bi bi-check-lg me-1"></i> Accept
                            </button>
                            <button
                              className="btn btn-sm btn-luxury-outline py-1 px-2"
                              style={{ fontSize: '0.78rem', color: '#DC2626' }}
                              onClick={() => handleReject(order.id)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </>
                        )}

                        <button
                          className="btn btn-sm btn-luxury-outline py-1 px-2"
                          style={{ fontSize: '0.78rem' }}
                          onClick={() => {
                            setDateModalOrder(order.id);
                            setExpectedDate(order.expectedDeliveryDate || '');
                          }}
                        >
                          <i className="bi bi-calendar-event me-1"></i> Schedule
                        </button>

                        {order.status.toUpperCase() !== 'COMPLETED' && order.status.toUpperCase() !== 'REJECTED' && (
                          <button
                            className="btn btn-sm btn-luxury-burgundy py-1 px-2"
                            style={{ fontSize: '0.78rem' }}
                            onClick={() => handleComplete(order.id)}
                          >
                            <i className="bi bi-patch-check me-1"></i> Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Set Delivery Date Modal */}
      {dateModalOrder !== null && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(10, 13, 22, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1080 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-2xl" style={{ background: '#FFFFFF', border: '1px solid var(--border-gold)' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border-gold)' }}>
                <h5 className="modal-title brand-font" style={{ color: 'var(--midnight)' }}>
                  Set Completion Schedule for Order #{dateModalOrder}
                </h5>
                <button type="button" className="btn-close" onClick={() => setDateModalOrder(null)}></button>
              </div>
              <div className="modal-body p-4">
                <p className="text-muted small mb-3">Commit to a target loom completion date for the proprietor and buyer:</p>
                <div className="mb-3">
                  <label className="form-luxury-label">Expected Completion Date *</label>
                  <input
                    type="date"
                    className="form-control-luxury"
                    required
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid var(--border-gold)' }}>
                <button type="button" className="btn btn-luxury-outline" onClick={() => setDateModalOrder(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-luxury-gold"
                  disabled={!expectedDate}
                  onClick={() => handleDateSave(dateModalOrder)}
                >
                  Commit Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
