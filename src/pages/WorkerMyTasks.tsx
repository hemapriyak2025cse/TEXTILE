import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Task } from '../types';

interface WorkerMyTasksProps {
  setCurrentView: (view: string) => void;
}

export const WorkerMyTasks: React.FC<WorkerMyTasksProps> = ({ setCurrentView }) => {
  const { currentUser, tasks, updateTaskStatus, t } = useApp();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const myTasks = tasks.filter(t => t.assignedWorker === currentUser?.username);
  const total = myTasks.length;
  const completed = myTasks.filter(t => t.status === 'Completed').length;
  const inProgress = myTasks.filter(t => t.status === 'In Progress').length;
  const pending = myTasks.filter(t => t.status === 'Pending').length;

  const handleStatusChange = (taskId: number, newStatus: Task['status']) => {
    updateTaskStatus(taskId, newStatus);
    setSuccessMsg(`Loom Task #${taskId} progress updated to: ${newStatus}`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Artisan Handloom Queue
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Floor Execution</span>
          </div>
          <h2>My Assigned Loom Tasks</h2>
          <small>Track cutting, jacquard setup, vat dyeing, and Korvai zari weaving tasks assigned to you</small>
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
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-list-task"></i></div>
            <div className="kpi-value">{total}</div>
            <div className="kpi-label">Total Allocated Tasks</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-check2-circle"></i></div>
            <div className="kpi-value">{completed}</div>
            <div className="kpi-label">Completed Handloom Runs</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-hourglass-split"></i></div>
            <div className="kpi-value">{inProgress}</div>
            <div className="kpi-label">In Active Weave</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-charcoal"><i className="bi bi-clock"></i></div>
            <div className="kpi-value">{pending}</div>
            <div className="kpi-label">Pending Loom Setup</div>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="luxury-card p-4">
        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Task #</th>
                <th>Task Description &amp; Unit Target</th>
                <th>Department Loft</th>
                <th>Target Due Date</th>
                <th>Current Status</th>
                <th>Update Progress</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No tasks currently assigned to your artisan username ({currentUser?.username}).
                  </td>
                </tr>
              ) : (
                myTasks.map(task => (
                  <tr key={task.taskId}>
                    <td>
                      <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>#{task.taskId}</strong>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{task.taskName}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.84rem', color: '#6C7282' }}>{task.department}</span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--royal-navy)' }}>
                        <i className="bi bi-calendar-event me-1" style={{ color: 'var(--antique-gold)' }}></i>
                        {task.dueDate}
                      </span>
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        style={{
                          width: 'auto',
                          background: '#FFFFFF',
                          borderColor: 'var(--border-gold)',
                          fontSize: '0.84rem',
                          borderRadius: '6px'
                        }}
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.taskId, e.target.value as Task['status'])}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
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
