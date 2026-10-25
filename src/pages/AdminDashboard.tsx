import React from 'react';
import { useApp } from '../context/AppContext';
import { WarpWeftBanner } from '../components/animations/WarpWeftBanner';

interface AdminDashboardProps {
  setCurrentView: (view: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentView }) => {
  const { users, productionOrders, tasks, orders, stocks, workers, logs, currentUser, approveUser, rejectUser, t } = useApp();

  const totalUsers = users.length;
  const totalOwners = users.filter(u => u.role === 'OWNER').length;
  const totalWorkers = users.filter(u => u.role === 'WORKER').length;
  const totalAdmins = users.filter(u => u.role === 'ADMIN').length;
  const pendingUsers = users.filter(u => !u.approved);

  const totalProductionOrders = productionOrders.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;

  const totalOrders = orders.length;
  const totalStock = stocks.reduce((acc, s) => acc + s.quantity, 0);
  const recentLogs = [...logs].slice(0, 5);

  return (
    <div className="anim-fade-up">
      {/* Interwoven Thread Banner with Telemetry */}
      <WarpWeftBanner
        badgeText="CENTRAL OPERATIONS GOVERNANCE"
        title="TRIZEN Operations Administration &amp; Telemetry"
        subtitle={`Welcome, Operations Administrator ${currentUser?.fullName}. Real-time monitoring of automated textile spinning, workforce authorizations, and production compliance.`}
        loomSpeed="Active Loom Sync 98.4%"
      >
        <button
          className="btn btn-luxury-burgundy d-flex align-items-center gap-2"
          onClick={() => setCurrentView('admin-users')}
        >
          <i className="bi bi-person-check"></i>
          <span>Clearance Queue ({pendingUsers.length})</span>
        </button>
        <button
          className="btn btn-luxury-gold d-flex align-items-center gap-2"
          onClick={() => setCurrentView('admin-logs')}
        >
          <i className="bi bi-journal-text"></i>
          <span>Audit Logs</span>
        </button>
      </WarpWeftBanner>

      {/* Primary Staggered KPI Metrics Grid with Thread Pulse */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('admin-users')}>
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-people-fill"></i></div>
            <div className="kpi-value">{totalUsers}</div>
            <div className="kpi-label">Authorized Personnel</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>{totalOwners} Directors &bull; {totalWorkers} Operators</span>
              <span className="fw-semibold text-primary">All Verified</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('admin-users')}>
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-person-exclamation"></i></div>
            <div className="kpi-value">{pendingUsers.length}</div>
            <div className="kpi-label">Pending Account Approvals</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Requires Verification</span>
              <span className="fw-semibold" style={{ color: pendingUsers.length > 0 ? '#DC2626' : '#10B981' }}>
                {pendingUsers.length > 0 ? 'Action Needed' : 'Queue Clear'}
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('production-orders')}>
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-gear-wide-connected"></i></div>
            <div className="kpi-value">{totalProductionOrders}</div>
            <div className="kpi-label">Active Production Batches</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>6-Stage Routing</span>
              <span className="fw-semibold text-dark">Monitored</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('admin-logs')}>
            <div className="kpi-icon-wrap kpi-icon-charcoal"><i className="bi bi-shield-check"></i></div>
            <div className="kpi-value">{logs.length}</div>
            <div className="kpi-label">Logged Security Events</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Real-Time Telemetry</span>
              <span className="fw-semibold text-success">Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Telemetry Strip with Animated Production Indicators */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="luxury-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--antique-gold-dark)', fontWeight: 700 }}>
                Workforce Distribution
              </span>
              <div className="spindle-spin text-gold" style={{ fontSize: '1rem' }}>
                <i className="bi bi-fan"></i>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ fontSize: '0.86rem' }}>Plant &amp; Mill Directors</span>
              <span className="fw-bold font-heading" style={{ color: 'var(--midnight)' }}>{totalOwners}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ fontSize: '0.86rem' }}>Floor Operators &amp; Leads</span>
              <span className="fw-bold font-heading" style={{ color: 'var(--midnight)' }}>{totalWorkers}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ fontSize: '0.86rem' }}>Operations Administrators</span>
              <span className="fw-bold font-heading" style={{ color: 'var(--midnight)' }}>{totalAdmins}</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="luxury-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--antique-gold-dark)', fontWeight: 700 }}>
                Manufacturing Execution
              </span>
              <span className="badge rounded-pill bg-light text-primary border" style={{ fontSize: '0.68rem' }}>
                Active Shifts
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ fontSize: '0.86rem' }}>Completed Floor Tasks</span>
              <span className="status-pip completed">{completedTasks} Finished</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ fontSize: '0.86rem' }}>Active On Line / Loom</span>
              <span className="status-pip in-progress">{inProgressTasks} In Progress</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ fontSize: '0.86rem' }}>Queued Machine Tasks</span>
              <span className="status-pip pending">{pendingTasks} Pending</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="luxury-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--antique-gold-dark)', fontWeight: 700 }}>
                Inventory &amp; Commission Balance
              </span>
              <i className="bi bi-boxes text-gold"></i>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ fontSize: '0.86rem' }}>Raw Material Stock</span>
              <span className="fw-bold" style={{ color: 'var(--midnight)' }}>{totalStock.toLocaleString()} units</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ fontSize: '0.86rem' }}>Active Operators Available</span>
              <span className="fw-bold" style={{ color: 'var(--midnight)' }}>{workers.length} specialists</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ fontSize: '0.86rem' }}>Production Orders</span>
              <span className="fw-bold" style={{ color: 'var(--midnight)' }}>{totalOrders} orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row: Pending Vetting & Live Audit Stream */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="luxury-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-gold)' }}>
              <div>
                <h5 className="fw-bold mb-0 font-heading" style={{ color: 'var(--midnight)' }}>
                  Pending User Clearance Approvals
                </h5>
                <small className="text-muted">Operators and plant personnel awaiting system signoff</small>
              </div>
              <button className="btn btn-sm btn-luxury-outline" onClick={() => setCurrentView('admin-users')}>
                Review All &rarr;
              </button>
            </div>

            {pendingUsers.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-shield-check fs-2 d-block mb-2" style={{ color: '#10B981' }}></i>
                All user accounts possess verified clearance.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table-luxury">
                  <thead>
                    <tr>
                      <th>Candidate / Handle</th>
                      <th>Requested Role</th>
                      <th>Clearance Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map(user => (
                      <tr key={user.userId}>
                        <td>
                          <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{user.fullName}</div>
                          <small className="text-muted">@{user.username}</small>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--antique-gold-dark)' }}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-luxury-gold py-1 px-3"
                              style={{ fontSize: '0.78rem' }}
                              onClick={() => approveUser(user.userId)}
                            >
                              Authorize
                            </button>
                            <button
                              className="btn btn-sm btn-luxury-outline py-1 px-2"
                              style={{ fontSize: '0.78rem', color: '#DC2626' }}
                              onClick={() => rejectUser(user.userId)}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="luxury-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-gold)' }}>
              <div>
                <h5 className="fw-bold mb-0 font-heading" style={{ color: 'var(--midnight)' }}>
                  Recent System Audit Stream
                </h5>
                <small className="text-muted">Live event stream and security timestamps</small>
              </div>
              <button className="btn btn-sm btn-luxury-outline" onClick={() => setCurrentView('admin-logs')}>
                Full Audit Trail &rarr;
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {recentLogs.map(log => (
                <div
                  key={log.logId}
                  className="p-3 rounded-3"
                  style={{ background: '#FAF8F4', border: '1px solid rgba(198, 161, 91, 0.2)' }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--midnight)', letterSpacing: '0.04em' }}>
                      {log.action}
                    </span>
                    <small className="text-muted" style={{ fontSize: '0.72rem' }}>{log.timestamp}</small>
                  </div>
                  <div className="small fw-medium" style={{ color: 'var(--soft-charcoal)' }}>{log.details}</div>
                  <div className="text-muted mt-1" style={{ fontSize: '0.72rem' }}>
                    Authorizing Agent: <strong>{log.performedBy}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
