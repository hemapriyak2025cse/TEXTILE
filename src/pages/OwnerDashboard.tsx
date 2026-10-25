import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TextileProductionJourney } from '../components/animations/TextileProductionJourney';

interface OwnerDashboardProps {
  setCurrentView: (view: string) => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ setCurrentView }) => {
  const { currentUser, orders, productionOrders, stocks, workers, t } = useApp();

  const ownerOrders = orders.filter(o => o.ownerUsername === currentUser?.username || currentUser?.role === 'ADMIN');
  const totalOrders = ownerOrders.length;
  const pendingOrders = ownerOrders.filter(o => o.status.toUpperCase() === 'PENDING').length;
  const inProgressOrders = ownerOrders.filter(o => o.status.toUpperCase() === 'IN PROGRESS' || o.status.toUpperCase() === 'ACCEPTED').length;
  const completedOrders = ownerOrders.filter(o => o.status.toUpperCase() === 'COMPLETED').length;
  const totalStock = stocks.reduce((acc, s) => acc + s.quantity, 0);
  const totalWorkers = workers.length;

  const activeBatch = productionOrders[0] || {
    orderNumber: 'BATCH-2026-001',
    productName: 'Cotton Casual Shirt Line',
    currentStage: 'Stitching'
  const [selectedBatchStage, setSelectedBatchStage] = useState<string>(activeBatch.currentStage);

  const recentOrders = [...ownerOrders].slice(0, 5);

  return (
    <div className="anim-fade-up">
      {/* Top Header */}
      <div className="luxury-header-block flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Textile Mill Management Console
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Unit #{currentUser?.userId || '900002'}</span>
          </div>
          <h2>Mill Operations &amp; Production Control</h2>
          <small>
            Welcome, Plant Director <strong style={{ color: 'var(--midnight)' }}>{currentUser?.fullName}</strong>. Live synchronization across automated spinning, loom queues, material inventories, and operator disbursements.
          </small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-luxury-gold d-flex align-items-center gap-2"
            onClick={() => setCurrentView('create-order')}
          >
            <i className="bi bi-patch-plus"></i>
            <span>New Production Order</span>
          </button>
          <button
            className="btn btn-luxury-burgundy d-flex align-items-center gap-2"
            onClick={() => setCurrentView('production-tracking')}
          >
            <i className="bi bi-diagram-3"></i>
            <span>Stage Pipeline</span>
          </button>
        </div>
      </div>

      {/* Visual Textile-Production Journey: Raw Yarn -> Dyeing -> Warping -> Loom -> Finishing -> Completed Fabric */}
      <TextileProductionJourney 
        currentStage={selectedBatchStage}
        batchNumber={activeBatch.orderNumber}
        productName={activeBatch.productName}
        interactive={true}
        onSelectStage={(stage) => setSelectedBatchStage(stage)}
      />

      {/* KPI Luxury Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('owner-orders')}>
            <div className="kpi-icon-wrap kpi-icon-burgundy">
              <i className="bi bi-card-checklist"></i>
            </div>
            <div className="kpi-value">{totalOrders}</div>
            <div className="kpi-label">{t('stat.totalOrders')}</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Commercial Pipeline</span>
              <span className="fw-semibold text-dark">Active Orders</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('owner-orders')}>
            <div className="kpi-icon-wrap kpi-icon-gold">
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div className="kpi-value">{pendingOrders}</div>
            <div className="kpi-label">Pending Allocation</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Awaiting Operators</span>
              <span className="fw-semibold" style={{ color: 'var(--antique-gold-dark)' }}>Action Needed</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('production-tracking')}>
            <div className="kpi-icon-wrap kpi-icon-navy">
              <i className="bi bi-gear-wide-connected"></i>
            </div>
            <div className="kpi-value">{inProgressOrders}</div>
            <div className="kpi-label">Active Loom Runs</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Warping &amp; Weaving</span>
              <span className="fw-semibold text-primary">On Schedule</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('stock-search')}>
            <div className="kpi-icon-wrap kpi-icon-charcoal">
              <i className="bi bi-box-seam"></i>
            </div>
            <div className="kpi-value">{totalStock.toLocaleString()}</div>
            <div className="kpi-label">Fabric &amp; Yarn Vault</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>{workers.length} Skilled Specialists</span>
              <span className="fw-semibold text-success">Optimal Level</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="row g-4 mb-4">
        {/* Recent Orders Table */}
        <div className="col-lg-8">
          <div className="luxury-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-0 font-heading" style={{ color: 'var(--midnight)' }}>
                  Active Production Orders
                </h5>
                <small className="text-muted">High-priority manufacturing batches and schedule commitments</small>
              </div>
              <button
                className="btn btn-sm btn-luxury-outline"
                onClick={() => setCurrentView('owner-orders')}
              >
                All Orders &rarr;
              </button>
            </div>

            <div className="table-responsive">
              <table className="table-luxury">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Textile Item</th>
                    <th>Batch Quantity</th>
                    <th>Floor Lead</th>
                    <th>Stage Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">No recent production orders on record.</td>
                    </tr>
                  ) : (
                    recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>
                          <strong style={{ color: 'var(--midnight)' }}>#{order.id}</strong>
                        </td>
                        <td>
                          <div className="fw-semibold">{order.productName}</div>
                          {order.remarks && <small className="text-muted d-block">{order.remarks}</small>}
                        </td>
                        <td>
                          <span className="fw-bold">{order.quantity} pcs</span>
                        </td>
                        <td>
                          {order.workerUsername ? (
                            <span style={{ fontSize: '0.84rem', color: 'var(--midnight)' }}>
                              <i className="bi bi-person me-1 text-secondary"></i>
                              {order.workerUsername}
                            </span>
                          ) : (
                            <span className="text-warning small" style={{ fontStyle: 'italic' }}>Unassigned</span>
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Operations Mill Menu */}
        <div className="col-lg-4">
          <div className="luxury-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-compass" style={{ color: 'var(--antique-gold)' }}></i>
                <h5 className="fw-bold mb-0 font-heading" style={{ color: 'var(--midnight)' }}>
                  Manufacturing Workflows
                </h5>
              </div>
              <p className="text-muted small mb-4" style={{ lineHeight: '1.6' }}>
                Operational shortcuts for initiating production batches, workforce dispatch, and inventory reconciliations.
              </p>

              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-light text-start p-3 rounded-3 d-flex align-items-center justify-content-between border transition-all"
                  style={{ background: '#FAF7F0', borderColor: 'var(--border-gold)' }}
                  onClick={() => setCurrentView('create-order')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="kpi-icon-wrap kpi-icon-burgundy m-0" style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}>
                      <i className="bi bi-patch-plus"></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.88rem' }}>Create Manufacturing Order</div>
                      <small className="text-muted">New client commission booking</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </button>

                <button
                  className="btn btn-light text-start p-3 rounded-3 d-flex align-items-center justify-content-between border transition-all"
                  style={{ background: '#FAF7F0', borderColor: 'var(--border-gold)' }}
                  onClick={() => setCurrentView('production-batch')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="kpi-icon-wrap kpi-icon-gold m-0" style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}>
                      <i className="bi bi-boxes"></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.88rem' }}>Launch Production Batch</div>
                      <small className="text-muted">Initiate floor manufacturing run</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </button>

                <button
                  className="btn btn-light text-start p-3 rounded-3 d-flex align-items-center justify-content-between border transition-all"
                  style={{ background: '#FAF7F0', borderColor: 'var(--border-gold)' }}
                  onClick={() => setCurrentView('payment-tracking')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="kpi-icon-wrap kpi-icon-navy m-0" style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}>
                      <i className="bi bi-currency-rupee"></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.88rem' }}>Worker Payout Ledger</div>
                      <small className="text-muted">Piece-rate disbursements in ₹</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </button>

                <button
                  className="btn btn-light text-start p-3 rounded-3 d-flex align-items-center justify-content-between border transition-all"
                  style={{ background: '#FAF7F0', borderColor: 'var(--border-gold)' }}
                  onClick={() => setCurrentView('stock-search')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="kpi-icon-wrap kpi-icon-charcoal m-0" style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}>
                      <i className="bi bi-box-seam"></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.88rem' }}>Fabric &amp; Spool Vault</div>
                      <small className="text-muted">Yarns, chemicals, and accessories</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 text-center" style={{ borderTop: '1px solid var(--border-gold)' }}>
              <span className="small text-muted" style={{ fontSize: '0.74rem' }}>
                ✦ TRIZEN Smart Loom Control &amp; Quality Inspection Certified ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
