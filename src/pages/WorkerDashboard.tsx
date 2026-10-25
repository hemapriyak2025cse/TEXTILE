import React from 'react';
import { useApp } from '../context/AppContext';
import { SpindleProgressGauge } from '../components/animations/SpindleProgressGauge';

interface WorkerDashboardProps {
  setCurrentView: (view: string) => void;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ setCurrentView }) => {
  const { currentUser, tasks, orders, t } = useApp();

  const myTasks = tasks.filter(t => t.assignedWorker === currentUser?.username);
  const myOrders = orders.filter(o => o.workerUsername === currentUser?.username);

  const assignedTasksCount = myTasks.length;
  const completedTasksCount = myTasks.filter(t => t.status === 'Completed').length;
  const pendingTasksCount = myTasks.filter(t => t.status === 'Pending').length;
  const inProgressTasksCount = myTasks.filter(t => t.status === 'In Progress').length;
  const completionRate = assignedTasksCount > 0 ? Math.round((completedTasksCount / assignedTasksCount) * 100) : 100;

  return (
    <div className="anim-fade-up">
      {/* Top Header */}
      <div className="luxury-header-block flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Textile Specialist &bull; Floor Workstation
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Shift Clearance Active</span>
          </div>
          <h2>Production Floor Workbench</h2>
          <small>
            Welcome, Textile Specialist <strong style={{ color: 'var(--midnight)' }}>{currentUser?.fullName}</strong> (@{currentUser?.username}). Tracking machine task queues, assigned production batches, and earned piece-rate wages in Indian Rupees (₹).
          </small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-luxury-burgundy d-flex align-items-center gap-2"
            onClick={() => setCurrentView('worker-my-tasks')}
          >
            <i className="bi bi-list-check"></i>
            <span>Machine Task Queue</span>
          </button>
          <button
            className="btn btn-luxury-gold d-flex align-items-center gap-2"
            onClick={() => setCurrentView('worker-orders')}
          >
            <i className="bi bi-box-seam"></i>
            <span>Allocated Production</span>
          </button>
        </div>
      </div>

      {/* Thread-Inspired Spindle Progress Banner */}
      <div 
        className="luxury-card p-4 mb-4 position-relative overflow-hidden" 
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF8F4 100%)',
          border: '1px solid rgba(198, 161, 91, 0.35)'
        }}
      >
        <div className="row align-items-center g-4">
          <div className="col-md-4 col-lg-3 text-center border-end-md">
            <SpindleProgressGauge
              progress={completionRate}
              size={135}
              label="Shift Quota Completion"
              sublabel="Machine Speed 840 RPM"
              yarnColor="#C6A15B"
            />
          </div>

          <div className="col-md-8 col-lg-9 ps-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--antique-gold-dark)', fontWeight: 700 }}>
                  Warp &amp; Weft Throughput Rate
                </span>
                <h5 className="font-heading fw-bold mb-0 mt-1" style={{ color: 'var(--midnight)' }}>
                  Active Shift Manufacturing Efficiency
                </h5>
              </div>
              <div className="text-end">
                <span className="badge rounded-pill bg-dark border border-secondary text-gold" style={{ fontSize: '0.75rem' }}>
                  {completedTasksCount} of {assignedTasksCount} Units Finished
                </span>
              </div>
            </div>

            <p className="text-muted small mb-3">
              Real-time monitoring of thread tension, stitch cadence, and quality sign-off across your allocated factory floor tasks.
            </p>

            {/* Linear Traveling Thread Progress Bar */}
            <div className="progress position-relative" style={{ height: '10px', background: 'rgba(198, 161, 91, 0.15)', borderRadius: '6px' }}>
              <div
                className="progress-bar position-relative"
                role="progressbar"
                style={{
                  width: `${completionRate}%`,
                  background: 'linear-gradient(90deg, #C6A15B 0%, #E6D5AD 60%, #38BDF8 100%)',
                  borderRadius: '6px',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
                }}
              ></div>
            </div>

            <div className="d-flex justify-content-between text-muted mt-2" style={{ fontSize: '0.75rem' }}>
              <span>Preparation &amp; Cutting</span>
              <span className="text-gold fw-semibold">{inProgressTasksCount} Active In Progress</span>
              <span>Final Quality Sealing</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('worker-my-tasks')}>
            <div className="kpi-icon-wrap kpi-icon-navy">
              <i className="bi bi-list-task"></i>
            </div>
            <div className="kpi-value">{assignedTasksCount}</div>
            <div className="kpi-label">Assigned Shift Tasks</div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('worker-my-tasks')}>
            <div className="kpi-icon-wrap kpi-icon-gold">
              <i className="bi bi-check2-circle"></i>
            </div>
            <div className="kpi-value">{completedTasksCount}</div>
            <div className="kpi-label">Completed Floor Runs</div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('worker-my-tasks')}>
            <div className="kpi-icon-wrap kpi-icon-burgundy">
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div className="kpi-value">{pendingTasksCount}</div>
            <div className="kpi-label">Pending Loom Allocation</div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="kpi-luxury-card cursor-pointer" onClick={() => setCurrentView('worker-orders')}>
            <div className="kpi-icon-wrap kpi-icon-charcoal">
              <i className="bi bi-box-seam"></i>
            </div>
            <div className="kpi-value">{myOrders.length}</div>
            <div className="kpi-label">Allocated Production Lines</div>
          </div>
        </div>
      </div>

      {/* Task & Order Columns */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="luxury-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-gold)' }}>
              <div>
                <h5 className="fw-bold mb-0 font-heading" style={{ color: 'var(--midnight)' }}>
                  Active Floor Tasks
                </h5>
                <small className="text-muted">Manufacturing tasks in your current shift queue</small>
              </div>
              <button
                className="btn btn-sm btn-luxury-outline"
                onClick={() => setCurrentView('worker-my-tasks')}
              >
                View Queue &rarr;
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {myTasks.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <i className="bi bi-check2-all fs-2 d-block mb-2 text-success"></i>
                  All allocated tasks are completed.
                </div>
              ) : (
                myTasks.slice(0, 4).map(task => (
                  <div
                    key={task.taskId}
                    className="p-3 rounded-3 d-flex justify-content-between align-items-center transition-all"
                    style={{ background: '#FAF8F4', border: '1px solid rgba(198, 161, 91, 0.2)' }}
                  >
                    <div>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{task.taskName}</div>
                      <small className="text-muted d-block mt-1">
                        Department: <strong>{task.department}</strong> &bull; Due: <strong>{task.dueDate}</strong>
                      </small>
                    </div>
                    <span
                      className={`status-pip ${
                        task.status === 'Completed'
                          ? 'completed'
                          : task.status === 'In Progress'
                          ? 'in-progress'
                          : 'pending'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="luxury-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-gold)' }}>
              <div>
                <h5 className="fw-bold mb-0 font-heading" style={{ color: 'var(--midnight)' }}>
                  Allocated Production Lines
                </h5>
                <small className="text-muted">Customer orders assigned to your machine line</small>
              </div>
              <button
                className="btn btn-sm btn-luxury-outline"
                onClick={() => setCurrentView('worker-orders')}
              >
                Manage Orders &rarr;
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {myOrders.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                  No customer orders currently assigned.
                </div>
              ) : (
                myOrders.slice(0, 4).map(order => (
                  <div
                    key={order.id}
                    className="p-3 rounded-3 d-flex justify-content-between align-items-center transition-all"
                    style={{ background: '#FAF8F4', border: '1px solid rgba(198, 161, 91, 0.2)' }}
                  >
                    <div>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>
                        Order #{order.id}: {order.productName}
                      </div>
                      <small className="text-muted d-block mt-1">
                        Volume: <strong>{order.quantity} pcs</strong> &bull; Expected: <strong>{order.expectedDeliveryDate || 'Awaiting date'}</strong>
                      </small>
                    </div>
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
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
