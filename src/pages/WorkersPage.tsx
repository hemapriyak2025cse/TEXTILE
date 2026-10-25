import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface WorkersPageProps {
  setCurrentView: (view: string) => void;
}

export const WorkersPage: React.FC<WorkersPageProps> = ({ setCurrentView }) => {
  const { workers, addWorker, deleteWorker, currentUser, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [availFilter, setAvailFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorker, setNewWorker] = useState({
    workerName: '',
    skill: 'Korvai Zari Weaving',
    department: 'Stitching',
    phoneNumber: '+91 94432 00000',
    availability: 'Available' as 'Available' | 'Busy'
  });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const totalWorkers = workers.length;
  const availableWorkers = workers.filter(w => w.availability === 'Available').length;
  const busyWorkers = workers.filter(w => w.availability === 'Busy').length;

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || w.department === deptFilter;
    const matchesAvail = availFilter === 'ALL' || w.availability === availFilter;
    return matchesSearch && matchesDept && matchesAvail;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorker.workerName.trim()) return;
    addWorker(newWorker);
    setSuccessMsg(`Artisan ${newWorker.workerName} registered in ${newWorker.department} loft`);
    setShowAddModal(false);
    setNewWorker({
      workerName: '',
      skill: 'Korvai Zari Weaving',
      department: 'Stitching',
      phoneNumber: '+91 94432 00000',
      availability: 'Available'
    });
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const departments = ['ALL', 'Cutting', 'Stitching', 'Checking', 'Packing'];

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Kanchipuram Master Weavers Guild
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Artisan Roster</span>
          </div>
          <h2>Master Artisans &amp; Handloom Weavers</h2>
          <small>Roster of master craftsmen, jacquard weavers, vat dyers, and Silk Mark inspectors</small>
        </div>
        {(currentUser?.role === 'OWNER' || currentUser?.role === 'ADMIN') && (
          <button
            className="btn btn-luxury-gold d-flex align-items-center gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bi bi-person-plus-fill"></i>
            <span>Register New Artisan</span>
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
        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-people"></i></div>
            <div className="kpi-value">{totalWorkers}</div>
            <div className="kpi-label">Registered Master Artisans</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Guild Certified</span>
              <span className="fw-semibold text-primary">All Lofts</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-person-check"></i></div>
            <div className="kpi-value">{availableWorkers}</div>
            <div className="kpi-label">Available for Loom Assignment</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Ready for Shift</span>
              <span className="fw-semibold text-success">Active</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-person-workspace"></i></div>
            <div className="kpi-value">{busyWorkers}</div>
            <div className="kpi-label">Currently At Handloom / Busy</div>
            <div className="mt-2 pt-2 d-flex justify-content-between align-items-center small text-muted" style={{ borderTop: '1px solid rgba(198, 161, 91, 0.15)', fontSize: '0.75rem' }}>
              <span>Active Weaving Runs</span>
              <span className="fw-semibold" style={{ color: 'var(--heritage-burgundy)' }}>On Loom</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roster & Filters */}
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
                placeholder="Search by artisan name, technique, or department loft..."
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
              {departments.map(d => (
                <option key={d} value={d}>{d === 'ALL' ? 'All Department Lofts' : `${d} Loft`}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select-luxury"
              value={availFilter}
              onChange={(e) => setAvailFilter(e.target.value)}
            >
              <option value="ALL">All Availabilities</option>
              <option value="Available">Available Only</option>
              <option value="Busy">Busy / On Loom Only</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Artisan #</th>
                <th>Craftsman Handle / Name</th>
                <th>Department Loft</th>
                <th>Master Technique / Skill</th>
                <th>Phone Contact</th>
                <th>Availability Status</th>
                {(currentUser?.role === 'OWNER' || currentUser?.role === 'ADMIN') && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No artisans match your criteria.
                  </td>
                </tr>
              ) : (
                filteredWorkers.map(w => (
                  <tr key={w.workerId}>
                    <td>
                      <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>#{w.workerId}</strong>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>
                        <i className="bi bi-person-circle me-2" style={{ color: 'var(--antique-gold)' }}></i>
                        {w.workerName}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.84rem', color: '#6C7282' }}>{w.department} Loft</span>
                    </td>
                    <td>
                      <span className="fw-medium">{w.skill}</span>
                    </td>
                    <td>
                      <small className="text-muted">
                        <i className="bi bi-telephone text-muted me-1"></i>
                        {w.phoneNumber}
                      </small>
                    </td>
                    <td>
                      <span className={`status-pip ${w.availability === 'Available' ? 'available' : 'busy'}`}>
                        {w.availability}
                      </span>
                    </td>
                    {(currentUser?.role === 'OWNER' || currentUser?.role === 'ADMIN') && (
                      <td>
                        <button
                          className="btn btn-sm btn-luxury-outline py-1 px-2"
                          style={{ fontSize: '0.78rem', color: '#DC2626' }}
                          onClick={() => deleteWorker(w.workerId)}
                          title="Remove Artisan from Roster"
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

      {/* Add Worker Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(10, 13, 22, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1080 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-2xl" style={{ background: '#FFFFFF', border: '1px solid var(--border-gold)' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border-gold)' }}>
                <h5 className="modal-title brand-font" style={{ color: 'var(--midnight)' }}>
                  Register Master Artisan into Guild
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-luxury-label">Artisan Name / Handle *</label>
                    <input
                      type="text"
                      className="form-control-luxury"
                      required
                      placeholder="e.g. demo_worker051 or Ramanathan Weaver"
                      value={newWorker.workerName}
                      onChange={(e) => setNewWorker({ ...newWorker, workerName: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Department Loft *</label>
                    <select
                      className="form-select-luxury"
                      value={newWorker.department}
                      onChange={(e) => setNewWorker({ ...newWorker, department: e.target.value })}
                    >
                      <option value="Cutting">Cutting &bull; Warp Alignment</option>
                      <option value="Stitching">Stitching &bull; Jacquard Looms</option>
                      <option value="Checking">Checking &bull; Silk Mark QA</option>
                      <option value="Packing">Packing &bull; Vault Finishing</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Craftsmanship Technique / Skill *</label>
                    <input
                      type="text"
                      className="form-control-luxury"
                      required
                      placeholder="e.g. Korvai Zari Weaving, Petni Border Interlock, Punch Card Piercing"
                      value={newWorker.skill}
                      onChange={(e) => setNewWorker({ ...newWorker, skill: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Direct Mobile Phone Contact *</label>
                    <input
                      type="text"
                      className="form-control-luxury"
                      required
                      value={newWorker.phoneNumber}
                      onChange={(e) => setNewWorker({ ...newWorker, phoneNumber: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-luxury-label">Loom Availability</label>
                    <select
                      className="form-select-luxury"
                      value={newWorker.availability}
                      onChange={(e) => setNewWorker({ ...newWorker, availability: e.target.value as 'Available' | 'Busy' })}
                    >
                      <option value="Available">Available for Loom Allocation</option>
                      <option value="Busy">Currently At Loom / Busy</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTop: '1px solid var(--border-gold)' }}>
                  <button type="button" className="btn btn-luxury-outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Register Artisan
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
