import React from 'react';
import { useApp } from '../context/AppContext';
import { ThreadTimeline } from '../components/animations/ThreadTimeline';

interface NotificationsPageProps {
  setCurrentView: (view: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ setCurrentView }) => {
  const { notifications, currentUser, markNotificationRead, markAllNotificationsRead, t } = useApp();

  const userNotifications = notifications.filter(n => {
    if (!currentUser) return false;
    if (currentUser.role === 'ADMIN') return n.recipient === 'demo_admin' || n.recipient === 'all';
    return n.recipient === currentUser.username || n.recipient === 'all';
  });

  const unreadCount = userNotifications.filter(n => !n.readStatus).length;

  const timelineItems = userNotifications.map(n => ({
    id: n.notificationId,
    title: n.title,
    description: n.message,
    timestamp: n.createdAt,
    tag: n.readStatus ? 'Acknowledged' : 'New Dispatch',
    status: (n.readStatus ? 'completed' : 'active') as 'completed' | 'active',
    icon: n.readStatus ? 'bi-envelope-open' : 'bi-bell-fill'
  }));

  return (
    <div className="anim-fade-up">
      {/* Topbar */}
      <div className="luxury-header-block flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ color: 'var(--antique-gold)', fontSize: '0.9rem' }}>✦ TEXTILE DISPATCH STREAM</span>
            {unreadCount > 0 ? (
              <span className="status-pip active">{unreadCount} Pending Dispatches</span>
            ) : (
              <span className="status-pip completed">All Dispatches Acknowledged</span>
            )}
          </div>
          <h2>Operational Dispatches &amp; Plant Alerts</h2>
          <small>
            Real-time machine allocations, batch handovers, quality inspection notices, and treasury approvals
          </small>
        </div>

        <div className="d-flex align-items-center gap-2">
          {unreadCount > 0 && (
            <button
              className="btn btn-luxury-gold d-flex align-items-center gap-2"
              onClick={() => markAllNotificationsRead(currentUser?.username)}
            >
              <i className="bi bi-check2-all"></i>
              <span>{t('btn.markAllRead')}</span>
            </button>
          )}
          <button 
            className="btn-luxury-outline d-flex align-items-center gap-2 text-decoration-none"
            onClick={() => setCurrentView('dashboard')}
          >
            <i className="bi bi-arrow-left"></i>
            <span>Back to Console</span>
          </button>
        </div>
      </div>

      {/* Main Notifications Box */}
      <div className="luxury-card p-4 p-md-5">
        <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-light">
          <div>
            <h5 className="font-heading mb-1 text-dark">
              Textile Dispatch Chronicle ({userNotifications.length})
            </h5>
            <small className="text-muted">Filtered for your facility credentials ({currentUser?.role} clearance)</small>
          </div>
          {unreadCount > 0 && (
            <div 
              className="px-3 py-1 rounded-pill small fw-bold"
              style={{
                background: 'rgba(10, 17, 40, 0.08)',
                color: 'var(--midnight)',
                border: '1px solid rgba(198, 161, 91, 0.35)'
              }}
            >
              ● {unreadCount} Awaiting Acknowledgment
            </div>
          )}
        </div>

        {/* Animated Continuous Thread Timeline */}
        <ThreadTimeline
          items={timelineItems}
          emptyMessage="Your textile dispatch chronicle is clear. New machine allocations and production notices will register here automatically."
          onItemClick={(item) => markNotificationRead(Number(item.id))}
        />
      </div>
    </div>
  );
};
