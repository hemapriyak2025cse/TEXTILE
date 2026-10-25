import React from 'react';
import { useApp } from '../context/AppContext';

interface WorkerWorkHistoryProps {
  setCurrentView: (view: string) => void;
}

export const WorkerWorkHistory: React.FC<WorkerWorkHistoryProps> = ({ setCurrentView }) => {
  const { currentUser, orders, t } = useApp();

  const allAssigned = orders.filter(o => o.workerUsername === currentUser?.username);
  const completed = allAssigned.filter(o => o.status.toLowerCase() === 'completed');
  const totalQuantity = completed.reduce((sum, o) => sum + o.quantity, 0);

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Master Craftsman Delivery Archive
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Lifetime Provenance</span>
          </div>
          <h2>Artisan Work Delivery History</h2>
          <small>Verified archive of completed handloom runs, sealed sari deliveries, and client acceptance records</small>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-patch-check"></i></div>
            <div className="kpi-value">{completed.length}</div>
            <div className="kpi-label">Completed Handloom Commissions</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-gem"></i></div>
            <div className="kpi-value">{totalQuantity.toLocaleString()}</div>
            <div className="kpi-label">Total Pure Silk Saris Woven</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-clock-history"></i></div>
            <div className="kpi-value">{allAssigned.length}</div>
            <div className="kpi-label">Lifetime Commission Allocations</div>
          </div>
        </div>
      </div>

      <div className="luxury-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-gold)' }}>
          <div>
            <h5 className="fw-bold mb-0" style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
              Completed Work Provenance Records
            </h5>
            <small className="text-muted">Certified deliveries inspected and dispatched to buyers</small>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--antique-gold-dark)', fontWeight: 600 }}>
            {completed.length} Deliveries Sealed
          </span>
        </div>

        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Silk Product Specifications</th>
                <th>Delivered Units</th>
                <th>Silk Mill Proprietor</th>
                <th>Commission Date</th>
                <th>Completion Date</th>
                <th>Provenance Status</th>
              </tr>
            </thead>
            <tbody>
              {completed.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No completed jobs on record yet.
                  </td>
                </tr>
              ) : (
                completed.map(order => (
                  <tr key={order.id}>
                    <td>
                      <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>#{order.id}</strong>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{order.productName}</div>
                    </td>
                    <td>
                      <span className="fw-bold">{order.quantity} pcs</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.84rem', color: '#6C7282' }}>
                        <i className="bi bi-building me-1" style={{ color: 'var(--antique-gold)' }}></i>
                        {order.ownerUsername}
                      </span>
                    </td>
                    <td><small className="text-muted">{order.requestDate || '-'}</small></td>
                    <td>
                      <span style={{ color: 'var(--royal-navy)' }}>
                        <i className="bi bi-calendar-check me-1" style={{ color: '#10B981' }}></i>
                        {order.expectedDeliveryDate || 'Sealed'}
                      </span>
                    </td>
                    <td>
                      <span className="status-pip completed">
                        Silk Mark Certified
                      </span>
                    </td>
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
