import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface AdminActivityLogsProps {
  setCurrentView: (view: string) => void;
}

export const AdminActivityLogs: React.FC<AdminActivityLogsProps> = ({ setCurrentView }) => {
  const { logs, t } = useApp();
  const [selectedAction, setSelectedAction] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const actionTypes = [
    'ALL',
    'LOGIN',
    'ORDER_CREATION',
    'PROCESS_STAGE_UPDATE',
    'WORKER_ASSIGNMENT',
    'PAYMENT_CREATED',
    'PAYMENT_STATUS_UPDATE',
    'USER_APPROVED',
    'TASK_ASSIGNMENT'
  ];

  const filteredLogs = logs.filter(log => {
    const matchesAction = selectedAction === 'ALL' || log.action === selectedAction;
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAction && matchesSearch;
  });

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              System Telemetry &bull; Industrial Compliance
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Real-Time Event Stream</span>
          </div>
          <h2>TRIZEN Activity &amp; Audit Logs</h2>
          <small>Continuous audit trail recording order booking, stage transitions, worker assignment, and financial disbursements</small>
        </div>
      </div>

      <div className="luxury-card p-4">
        {/* Filters */}
        <div className="row g-3 mb-4">
          <div className="col-md-7">
            <div className="input-group">
              <span className="input-group-text" style={{ background: '#FAF7F0', borderColor: 'var(--border-gold)', color: 'var(--antique-gold-dark)' }}>
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control-luxury"
                style={{ borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                placeholder="Search audit details or agent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-luxury-outline"
                  onClick={() => setSearchTerm('')}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="col-md-5">
            <select
              className="form-select-luxury"
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
            >
              {actionTypes.map(act => (
                <option key={act} value={act}>
                  {act === 'ALL' ? 'All Event Categories' : act.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Log Ref</th>
                <th>Event Category</th>
                <th>Audit Details &amp; Transition</th>
                <th>Authorizing Agent</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No audit records match the query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.logId}>
                    <td>
                      <code style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)', color: 'var(--midnight)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                        #{log.logId}
                      </code>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--heritage-burgundy)', letterSpacing: '0.04em' }}>
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <span className="fw-medium" style={{ color: 'var(--midnight)' }}>{log.details}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.84rem', color: 'var(--royal-navy)' }}>
                        <i className="bi bi-person me-1" style={{ color: 'var(--antique-gold)' }}></i>
                        <strong>{log.performedBy}</strong>
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">{log.timestamp}</small>
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
