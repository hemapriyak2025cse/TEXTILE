import React from 'react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const { currentUser, logout, notifications, t } = useApp();

  if (!currentUser) return null;

  const role = currentUser.role;

  const unreadCount = notifications.filter(n => {
    if (role === 'ADMIN') return !n.readStatus && (n.recipient === 'demo_admin' || n.recipient === 'all');
    return !n.readStatus && (n.recipient === currentUser.username || n.recipient === 'all');
  }).length;

  return (
    <aside className="luxury-sidebar">
      {/* Brand Masthead */}
      <div className="brand-masthead cursor-pointer" onClick={() => setCurrentView('dashboard')}>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <div className="luxury-crest-icon" style={{ background: 'linear-gradient(135deg, #0A1128, #162444)' }}>
            <i className="bi bi-bezier2 text-gold"></i>
          </div>
          <span className="brand-title">TRIZEN</span>
        </div>
        <div className="brand-sub">Smart Textile Tracking &amp; ERP</div>
      </div>

      {/* User Loft Card */}
      <div className="luxury-user-panel">
        <div className="luxury-avatar" style={{ background: 'linear-gradient(135deg, #0A1128, #162444)' }}>
          {currentUser.fullName.charAt(0)}
        </div>
        <div className="user-meta overflow-hidden">
          <div className="text-white text-truncate fw-semibold" style={{ fontSize: '0.86rem', letterSpacing: '0.02em' }}>
            {currentUser.fullName}
          </div>
          <div className="d-flex align-items-center gap-2 mt-1">
            <span
              style={{
                fontSize: '0.66rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: role === 'ADMIN' ? '#00C9A7' : role === 'OWNER' ? 'var(--antique-gold)' : '#38BDF8',
                fontWeight: 700
              }}
            >
              {role === 'OWNER' ? 'Mill Director' : role === 'WORKER' ? 'Textile Specialist' : 'Operations Admin'}
            </span>
            <span style={{ color: 'rgba(198, 161, 91, 0.4)', fontSize: '0.6rem' }}>✦</span>
            <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>@{currentUser.username}</span>
          </div>
        </div>
      </div>

      <ul>
        {/* Common Dashboard */}
        <li>
          <button
            className={currentView === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentView('dashboard')}
          >
            <i className="bi bi-speedometer2"></i>
            <span>{t('nav.dashboard')}</span>
          </button>
        </li>

        {/* OWNER Specific Operations */}
        {role === 'OWNER' && (
          <>
            <li>
              <button
                className={currentView === 'owner-orders' ? 'active' : ''}
                onClick={() => setCurrentView('owner-orders')}
              >
                <i className="bi bi-card-checklist"></i>
                <span>{t('nav.ownerOrders')}</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'create-order' ? 'active' : ''}
                onClick={() => setCurrentView('create-order')}
              >
                <i className="bi bi-patch-plus"></i>
                <span>Commission Order</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'production-tracking' ? 'active' : ''}
                onClick={() => setCurrentView('production-tracking')}
              >
                <i className="bi bi-diagram-3"></i>
                <span>Production Stage Tracking</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'production-batch' ? 'active' : ''}
                onClick={() => setCurrentView('production-batch')}
              >
                <i className="bi bi-boxes"></i>
                <span>Launch Production Batch</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'payment-tracking' ? 'active' : ''}
                onClick={() => setCurrentView('payment-tracking')}
              >
                <i className="bi bi-currency-rupee"></i>
                <span>Worker Disbursements</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'stock-search' ? 'active' : ''}
                onClick={() => setCurrentView('stock-search')}
              >
                <i className="bi bi-box-seam"></i>
                <span>Fabric &amp; Yarn Inventory</span>
              </button>
            </li>
          </>
        )}

        {/* WORKER Specific Operations */}
        {role === 'WORKER' && (
          <>
            <li>
              <button
                className={currentView === 'worker-my-tasks' ? 'active' : ''}
                onClick={() => setCurrentView('worker-my-tasks')}
              >
                <i className="bi bi-list-check"></i>
                <span>Floor Task Queue</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'worker-orders' ? 'active' : ''}
                onClick={() => setCurrentView('worker-orders')}
              >
                <i className="bi bi-box-seam"></i>
                <span>Allocated Production</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'worker-history' ? 'active' : ''}
                onClick={() => setCurrentView('worker-history')}
              >
                <i className="bi bi-clock-history"></i>
                <span>Finished Goods Archive</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'worker-payments' ? 'active' : ''}
                onClick={() => setCurrentView('worker-payments')}
              >
                <i className="bi bi-wallet2"></i>
                <span>Wages &amp; Settlement Slips</span>
              </button>
            </li>
          </>
        )}

        {/* ADMIN Specific Operations */}
        {role === 'ADMIN' && (
          <>
            <li>
              <button
                className={currentView === 'admin-users' ? 'active' : ''}
                onClick={() => setCurrentView('admin-users')}
              >
                <i className="bi bi-person-check"></i>
                <span>{t('nav.userApproval')}</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'admin-logs' ? 'active' : ''}
                onClick={() => setCurrentView('admin-logs')}
              >
                <i className="bi bi-journal-text"></i>
                <span>System Audit Logs</span>
              </button>
            </li>
            <li>
              <button
                className={currentView === 'production-orders' ? 'active' : ''}
                onClick={() => setCurrentView('production-orders')}
              >
                <i className="bi bi-gear-wide-connected"></i>
                <span>Master Batch Register</span>
              </button>
            </li>
          </>
        )}

        {/* General Management */}
        <li>
          <button
            className={currentView === 'workers' ? 'active' : ''}
            onClick={() => setCurrentView('workers')}
          >
            <i className="bi bi-people"></i>
            <span>Textile Workforce Directory</span>
          </button>
        </li>

        <li>
          <button
            className={currentView === 'tasks' ? 'active' : ''}
            onClick={() => setCurrentView('tasks')}
          >
            <i className="bi bi-check2-square"></i>
            <span>All Floor Tasks</span>
          </button>
        </li>

        <li>
          <button
            className={currentView === 'reports' ? 'active' : ''}
            onClick={() => setCurrentView('reports')}
          >
            <i className="bi bi-file-earmark-bar-graph"></i>
            <span>Manufacturing Analytics</span>
          </button>
        </li>

        <li>
          <button
            className={currentView === 'notifications' ? 'active' : ''}
            onClick={() => setCurrentView('notifications')}
          >
            <i className="bi bi-bell"></i>
            <span className="d-flex justify-content-between align-items-center w-100">
              <span>{t('nav.notifications')}</span>
              {unreadCount > 0 && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--champagne)',
                    background: 'var(--heritage-burgundy)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-gold)'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </span>
          </button>
        </li>

        <li>
          <button
            className={currentView === 'profile' ? 'active' : ''}
            onClick={() => setCurrentView('profile')}
          >
            <i className="bi bi-person"></i>
            <span>{t('nav.profile')}</span>
          </button>
        </li>

        {/* Logout */}
        <li className="mt-4 pt-3" style={{ borderTop: '1px solid var(--border-gold)' }}>
          <button
            className="luxury-logout-btn"
            onClick={() => {
              logout();
              setCurrentView('login');
            }}
          >
            <i className="bi bi-box-arrow-left"></i>
            <span>{t('nav.logout')}</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};
