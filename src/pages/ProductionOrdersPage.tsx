import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface ProductionOrdersPageProps {
  setCurrentView: (view: string) => void;
}

export const ProductionOrdersPage: React.FC<ProductionOrdersPageProps> = ({ setCurrentView }) => {
  const { productionOrders, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const totalOrders = productionOrders.length;
  const completedOrders = productionOrders.filter(p => p.status === 'Completed').length;
  const inProgressOrders = productionOrders.filter(p => p.status === 'In Progress').length;
  const pendingOrders = productionOrders.filter(p => p.status === 'Pending').length;

  const filtered = productionOrders.filter(p => {
    const matchesSearch = p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.assignedWorker && p.assignedWorker.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Master Handloom Registry
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Atelier Manufacturing Runs</span>
          </div>
          <h2>Master Production Batches Register</h2>
          <small>Global manufacturing batches, weaving progress milestones, loom stage routing, and vault dispatch schedules</small>
        </div>
        <button
          className="btn btn-luxury-gold d-flex align-items-center gap-2"
          onClick={() => setCurrentView('production-batch')}
        >
          <i className="bi bi-boxes"></i>
          <span>Commission New Batch</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-boxes"></i></div>
            <div className="kpi-value">{totalOrders}</div>
            <div className="kpi-label">Total Commissioned Batches</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-check2-circle"></i></div>
            <div className="kpi-value">{completedOrders}</div>
            <div className="kpi-label">Completed &amp; Vaulted</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-gear-wide-connected"></i></div>
            <div className="kpi-value">{inProgressOrders}</div>
            <div className="kpi-label">Active Handloom Runs</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-charcoal"><i className="bi bi-clock"></i></div>
            <div className="kpi-value">{pendingOrders}</div>
            <div className="kpi-label">Pending Loom Setup</div>
          </div>
        </div>
      </div>

      <div className="luxury-card p-4">
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text" style={{ background: '#FAF7F0', borderColor: 'var(--border-gold)', color: 'var(--antique-gold-dark)' }}>
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control-luxury"
                style={{ borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                placeholder="Search by batch run number, silk product, or assigned weaver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select-luxury"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Batch Statuses</option>
              <option value="Pending">Pending Loom Setup</option>
              <option value="In Progress">In Active Weave</option>
              <option value="Completed">Completed &amp; Certified</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Batch Run #</th>
                <th>Silk Product Specifications</th>
                <th>Units</th>
                <th>Current Weave Gateway</th>
                <th>Allocated Weaver</th>
                <th>Target Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No production runs found.
                  </td>
                </tr>
              ) : (
                filtered.map(order => (
                  <tr key={order.orderId}>
                    <td>
                      <code style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)', color: 'var(--midnight)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                        {order.orderNumber}
                      </code>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{order.productName}</div>
                    </td>
                    <td>
                      <span className="fw-bold">{order.quantity.toLocaleString()} pcs</span>
                    </td>
                    <td>
                      <span className="status-pip in-progress">
                        {order.currentStage}
                      </span>
                    </td>
                    <td>
                      {order.assignedWorker ? (
                        <span style={{ fontSize: '0.84rem', color: '#6C7282' }}>
                          <i className="bi bi-person me-1" style={{ color: 'var(--antique-gold)' }}></i>
                          {order.assignedWorker}
                        </span>
                      ) : (
                        <span className="text-muted small" style={{ fontStyle: 'italic' }}>Loom Floor Pool</span>
                      )}
                    </td>
                    <td>
                      <span style={{ color: 'var(--royal-navy)' }}>
                        <i className="bi bi-calendar-event me-1" style={{ color: 'var(--antique-gold)' }}></i>
                        {order.deadline}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pip ${order.status === 'Completed' ? 'completed' : 'in-progress'}`}>
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
  );
};
