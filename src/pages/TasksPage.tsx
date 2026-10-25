import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Task } from '../types';

interface TasksPageProps {
  setCurrentView: (view: string) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ setCurrentView }) => {
  const { tasks, workers, createTask, deleteTask, currentUser, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({
    taskName: '',
    assignedWorker: '',
    department: 'Cutting',
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    status: 'Pending' as Task['status']
  });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.assignedWorker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesDept = deptFilter === 'ALL' || t.department === deptFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.taskName.trim() || !newTask.assignedWorker) return;
    createTask(newTask);
    setSuccessMsg(`Loom task '${newTask.taskName}' allocated to ${newTask.assignedWorker}`);
    setShowCreateModal(false);
    setNewTask({
      taskName: '',
      assignedWorker: '',
      department: 'Cutting',
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      status: 'Pending'
    });
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Looms &amp; Floor Task Dispatch
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Shift Schedule</span>
          </div>
          <h2>Atelier Floor Tasks &amp; Job Allocations</h2>
          <small>Manage granular warp cutting, jacquard setup, Korvai zari borders, and quality inspection queues</small>
        </div>
        {(currentUser?.role === 'OWNER' || currentUser?.role === 'ADMIN') && (
          <button
            className="btn btn-luxury-gold d-flex align-items-center gap-2"
            onClick={() => {
              setNewTask(prev => ({ ...prev, assignedWorker: workers[0]?.workerName || '' }));
              setShowCreateModal(true);
            }}
          >
            <i className="bi bi-patch-plus"></i>
            <span>Create New Loom Task</span>
          </button>
        )}
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
            <div className="kpi-value">{totalTasks}</div>
            <div className="kpi-label">Total Loom Tasks</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-check2-circle"></i></div>
            <div className="kpi-value">{completedTasks}</div>
            <div className="kpi-label">Completed Handloom Tasks</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-gear-wide-connected"></i></div>
            <div className="kpi-value">{inProgressTasks}</div>
            <div className="kpi-label">Active on Weaving Lofts</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-charcoal"><i className="bi bi-clock"></i></div>
            <div className="kpi-value">{pendingTasks}</div>
            <div className="kpi-label">Pending Loom Allocation</div>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="luxury-card p-4">
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text" style={{ background: '#FAF7F0', borderColor: 'var(--border-gold)', color: 'var(--antique-gold-dark)' }}>
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control-luxury"
                style={{ borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                placeholder="Search by task description or assigned craftsman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select-luxury"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="ALL">All Department Lofts</option>
              <option value="Cutting">Cutting Loft</option>
              <option value="Stitching">Stitching Loft</option>
              <option value="Checking">Checking Loft</option>
              <option value="Packing">Packing Loft</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select-luxury"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Task #</th>
                <th>Task Description &amp; Target Meterage</th>
                <th>Allocated Craftsman</th>
                <th>Department Loft</th>
                <th>Loom Deadline</th>
                <th>Status</th>
                {(currentUser?.role === 'OWNER' || currentUser?.role === 'ADMIN') && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No tasks match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTasks.map(task => (
                  <tr key={task.taskId}>
                    <td>
                      <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>#{task.taskId}</strong>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{task.taskName}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.84rem', color: '#6C7282' }}>
                        <i className="bi bi-person me-1" style={{ color: 'var(--antique-gold)' }}></i>
                        {task.assignedWorker}
                      </span>
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
                    {(currentUser?.role === 'OWNER' || currentUser?.role === 'ADMIN') && (
                      <td>
                        <button
                          className="btn btn-sm btn-luxury-outline py-1 px-2"
                          style={{ fontSize: '0.78rem', color: '#DC2626' }}
                          onClick={() => deleteTask(task.taskId)}
                          title="Delete Task"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(10, 13, 22, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1080 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-2xl" style={{ background: '#FFFFFF', border: '1px solid var(--border-gold)' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border-gold)' }}>
                <h5 className="modal-title brand-font" style={{ color: 'var(--midnight)' }}>
                  Create &amp; Allocate Floor Task
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
              </div>
              <form onSubmit={handleCreateSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-luxury-label">Task Name &amp; Unit Target *</label>
                    <input
                      type="text"
                      className="form-control-luxury"
                      required
                      placeholder="e.g. Korvai Zari Border Interlock on 50 Wedding Saris (Qty 50)"
                      value={newTask.taskName}
                      onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Allocate Master Weaver *</label>
                    <select
                      className="form-select-luxury"
                      required
                      value={newTask.assignedWorker}
                      onChange={(e) => {
                        const wName = e.target.value;
                        const match = workers.find(w => w.workerName === wName);
                        setNewTask({
                          ...newTask,
                          assignedWorker: wName,
                          department: match?.department || newTask.department
                        });
                      }}
                    >
                      <option value="">-- Choose Artisan --</option>
                      {workers.map(w => (
                        <option key={w.workerId} value={w.workerName}>
                          {w.workerName} ({w.department} - {w.skill})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Department Loft</label>
                    <select
                      className="form-select-luxury"
                      value={newTask.department}
                      onChange={(e) => setNewTask({ ...newTask, department: e.target.value })}
                    >
                      <option value="Cutting">Cutting Loft &bull; Warp Alignment</option>
                      <option value="Stitching">Stitching Loft &bull; Jacquard Looms</option>
                      <option value="Checking">Checking Loft &bull; Silk Mark QA</option>
                      <option value="Packing">Packing Loft &bull; Vault Preparation</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Loom Target Due Date *</label>
                    <input
                      type="date"
                      className="form-control-luxury"
                      required
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTop: '1px solid var(--border-gold)' }}>
                  <button type="button" className="btn btn-luxury-outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Assign Task to Loft
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
