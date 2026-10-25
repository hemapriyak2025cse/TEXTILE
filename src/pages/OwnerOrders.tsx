import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface OwnerOrdersProps {
  setCurrentView: (view: string) => void;
}

export const OwnerOrders: React.FC<OwnerOrdersProps> = ({ setCurrentView }) => {
  const { currentUser, orders, workers, assignWorkerToOrder, t } = useApp();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [assigningOrder, setAssigningOrder] = useState<number | null>(null);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const ownerOrders = orders.filter(o => o.ownerUsername === currentUser?.username || currentUser?.role === 'ADMIN');

  const filteredOrders = ownerOrders.filter(o => {
    if (statusFilter === 'ALL') return true;
    return o.status.toUpperCase() === statusFilter.toUpperCase();
  });

  const handleAssign = (orderId: number) => {
    if (!selectedWorker) return;
    assignWorkerToOrder(orderId, selectedWorker);
    setSuccessMsg(`Allocated Master Weaver ${selectedWorker} to Order #${orderId}`);
    setAssigningOrder(null);
    setSelectedWorker('');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="anim-fade-up">
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Commercial Weaves &amp; Buyer Commissions
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Atelier Order Register</span>
          </div>
          <h2>Customer Commissions Registry</h2>
          <small>Manage bespoke bridal silk orders, pure zari sari bookings, and assign skilled handloom weavers</small>
        </div>
        <button
          className="btn btn-luxury-gold d-flex align-items-center gap-2"
          onClick={() => setCurrentView('create-order')}
        >
          <i className="bi bi-patch-plus"></i>
          <span>Commission New Order</span>
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

      {/* Filter Segmented Controls */}
      <div className="d-flex flex-wrap gap-2 mb-4 p-2 rounded-3" style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)', width: 'fit-content' }}>
        {['ALL', 'PENDING', 'ACCEPTED', 'IN PROGRESS', 'COMPLETED', 'REJECTED'].map(status => {
          const count = status === 'ALL' ? ownerOrders.length : ownerOrders.filter(o => o.status.toUpperCase() === status).length;
          const isActive = statusFilter === status;

          return (
            <button
              key={status}
              className={`btn btn-sm ${isActive ? 'btn-luxury-burgundy' : 'btn-luxury-outline'} py-1 px-3`}
              style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}
              onClick={() => setStatusFilter(status)}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Luxury Orders Table */}
      <div className="luxury-card p-4">
        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Silk Product Specifications</th>
                <th>Units</th>
                <th>Commission Date</th>
                <th>Target Completion</th>
                <th>Allocated Weaver</th>
                <th>Status</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No buyer orders match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>#{order.id}</strong>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{order.productName}</div>
                      {order.remarks && <small className="text-muted d-block">{order.remarks}</small>}
                    </td>
                    <td>
                      <span className="fw-bold">{order.quantity} pcs</span>
                    </td>
                    <td>
                      <small className="text-muted">{order.requestDate || '-'}</small>
                    </td>
                    <td>
                      {order.expectedDeliveryDate ? (
                        <span className="fw-medium" style={{ color: 'var(--royal-navy)' }}>
                          <i className="bi bi-calendar-check me-1" style={{ color: 'var(--antique-gold)' }}></i>
                          {order.expectedDeliveryDate}
                        </span>
                      ) : (
                        <span className="text-muted small" style={{ fontStyle: 'italic' }}>Awaiting schedule</span>
                      )}
                    </td>
                    <td>
                      {order.workerUsername ? (
                        <span style={{ fontSize: '0.86rem', color: 'var(--midnight)' }}>
                          <i className="bi bi-person-circle me-1" style={{ color: 'var(--antique-gold)' }}></i>
                          {order.workerUsername}
                        </span>
                      ) : (
                        <span className="text-warning small" style={{ fontStyle: 'italic' }}>Unallocated</span>
                      )}
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
                      <button
                        className="btn btn-sm btn-luxury-outline d-flex align-items-center gap-1"
                        style={{ fontSize: '0.78rem', padding: '5px 12px' }}
                        onClick={() => {
                          setAssigningOrder(order.id);
                          setSelectedWorker(order.workerUsername || workers[0]?.workerName || '');
                        }}
                      >
                        <i className="bi bi-person-plus"></i>
                        <span>{order.workerUsername ? 'Reassign' : 'Allocate'}</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocate Artisan Modal */}
      {assigningOrder !== null && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(10, 13, 22, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1080 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-2xl" style={{ background: '#FFFFFF', border: '1px solid var(--border-gold)' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border-gold)' }}>
                <h5 className="modal-title brand-font" style={{ color: 'var(--midnight)' }}>
                  Allocate Master Weaver to Commission #{assigningOrder}
                </h5>
                <button type="button" className="btn-close" onClick={() => setAssigningOrder(null)}></button>
              </div>
              <div className="modal-body p-4">
                <p className="text-muted small mb-3">
                  Select a certified artisan matched with the necessary weaving technique:
                </p>
                <div className="mb-3">
                  <label className="form-luxury-label">Available Handloom Weavers</label>
                  <select
                    className="form-select-luxury"
                    value={selectedWorker}
                    onChange={(e) => setSelectedWorker(e.target.value)}
                  >
                    <option value="">-- Choose Artisan --</option>
                    {workers.map(w => (
                      <option key={w.workerId} value={w.workerName}>
                        {w.workerName} - {w.department} ({w.skill}) [{w.availability}]
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid var(--border-gold)' }}>
                <button type="button" className="btn btn-luxury-outline" onClick={() => setAssigningOrder(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-luxury-gold"
                  disabled={!selectedWorker}
                  onClick={() => handleAssign(assigningOrder)}
                >
                  Confirm Allocation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
