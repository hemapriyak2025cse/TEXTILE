import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface AdminUsersProps {
  setCurrentView: (view: string) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ setCurrentView }) => {
  const { users, approveUser, rejectUser, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const pendingUsers = users.filter(u => !u.approved);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleApprove = (userId: number, name: string) => {
    approveUser(userId);
    setAlertMsg(`Authorized guild clearance for ${name}`);
    setTimeout(() => setAlertMsg(null), 3000);
  };

  const handleReject = (userId: number, name: string) => {
    rejectUser(userId);
    setAlertMsg(`Dismissed registration application for ${name}`);
    setTimeout(() => setAlertMsg(null), 3000);
  };

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#DC2626', fontWeight: 700 }}>
              Imperial Clearance &bull; User Governance
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Atelier Vetting</span>
          </div>
          <h2>Artisan &amp; Proprietor Clearance Directory</h2>
          <small>Authorize textile factory registrations, maintain role compliance, and administer guild permissions</small>
        </div>
      </div>

      {alertMsg && (
        <div
          className="d-flex align-items-center gap-2 p-3 mb-4 rounded-3 anim-fade-up"
          style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10B981', color: '#065F46' }}
        >
          <i className="bi bi-check-circle-fill fs-5"></i>
          <div className="fw-semibold" style={{ fontSize: '0.88rem' }}>{alertMsg}</div>
        </div>
      )}

      {/* Pending Vetting Panel */}
      <div className="luxury-card p-4 mb-4" style={{ border: '1px solid var(--border-gold-strong)' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-gold)' }}>
          <div>
            <h5 className="fw-bold mb-0" style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
              Pending Clearance Authorizations ({pendingUsers.length})
            </h5>
            <small className="text-muted">Newly submitted artisan and proprietor applications awaiting administrator review</small>
          </div>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-shield-check fs-2 d-block mb-2 text-success"></i>
            No registration requests are currently pending administrative review.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-luxury">
              <thead>
                <tr>
                  <th>Candidate Legal Name</th>
                  <th>Guild Handle</th>
                  <th>Official Email</th>
                  <th>Phone Contact</th>
                  <th>Target Role</th>
                  <th>Clearance Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(user => (
                  <tr key={user.userId}>
                    <td className="fw-bold" style={{ color: 'var(--midnight)' }}>{user.fullName}</td>
                    <td><code>{user.username}</code></td>
                    <td>{user.email}</td>
                    <td>{user.phone || '-'}</td>
                    <td>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: user.role === 'OWNER' ? 'var(--antique-gold-dark)' : '#059669' }}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-luxury-gold py-1 px-3"
                          style={{ fontSize: '0.78rem' }}
                          onClick={() => handleApprove(user.userId, user.fullName)}
                        >
                          <i className="bi bi-check-lg me-1"></i> Authorize
                        </button>
                        <button
                          className="btn btn-sm btn-luxury-outline py-1 px-2"
                          style={{ fontSize: '0.78rem', color: '#DC2626' }}
                          onClick={() => handleReject(user.userId, user.fullName)}
                        >
                          <i className="bi bi-x-lg me-1"></i> Reject
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

      {/* All Guild Users Directory */}
      <div className="luxury-card p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-gold)' }}>
          <div>
            <h5 className="fw-bold mb-0" style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
              Master Guild Register ({users.length})
            </h5>
            <small className="text-muted">Complete list of verified mill owners, administrators, and master weavers</small>
          </div>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control-luxury"
              placeholder="Search user..."
              style={{ width: '220px', padding: '6px 12px', fontSize: '0.84rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select-luxury"
              style={{ width: '140px', padding: '6px 12px', fontSize: '0.84rem' }}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">ADMIN</option>
              <option value="OWNER">OWNER</option>
              <option value="WORKER">WORKER</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Guild ID</th>
                <th>Candidate Legal Name</th>
                <th>Username</th>
                <th>Email Contact</th>
                <th>Role Clearance</th>
                <th>Clearance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.userId}>
                  <td>
                    <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>#{user.userId}</strong>
                  </td>
                  <td className="fw-semibold" style={{ color: 'var(--midnight)' }}>{user.fullName}</td>
                  <td><code>{user.username}</code></td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: user.role === 'ADMIN' ? '#DC2626' : user.role === 'OWNER' ? 'var(--antique-gold-dark)' : '#059669'
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.approved ? (
                      <span className="status-pip completed">
                        Verified Guild Member
                      </span>
                    ) : (
                      <span className="status-pip pending">
                        Pending Vetting
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
