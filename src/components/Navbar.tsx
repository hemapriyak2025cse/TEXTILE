import React from 'react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { currentUser, language, setLanguage, darkMode, toggleDarkMode, logout, switchUser, users, notifications, t } = useApp();

  const unreadCount = notifications.filter(n => {
    if (!currentUser) return false;
    if (currentUser.role === 'ADMIN') return !n.readStatus && (n.recipient === 'demo_admin' || n.recipient === 'all');
    return !n.readStatus && (n.recipient === currentUser.username || n.recipient === 'all');
  }).length;

  return (
    <nav className="luxury-navbar sticky-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <a
          className="navbar-brand"
          href="#"
          onClick={(e) => { e.preventDefault(); setCurrentView(currentUser ? 'dashboard' : 'home'); }}
        >
          <div className="luxury-crest-icon" style={{ background: 'linear-gradient(135deg, #0A1128, #162444)' }}>
            <i className="bi bi-bezier2 text-gold"></i>
          </div>
          <div className="d-flex flex-column">
            <span className="brand-font fw-bold" style={{ letterSpacing: '0.12em', lineHeight: '1.1' }}>
              TRIZEN
            </span>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'var(--antique-gold)', textTransform: 'uppercase' }}>
              Smart Textile Tracking
            </span>
          </div>
        </a>

        <div className="d-flex align-items-center gap-3">
          {/* Quick Demo Role Switcher */}
          <div className="dropdown d-none d-md-block">
            <button
              className="btn btn-sm btn-luxury-outline d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              title={t('nav.switchRole')}
              style={{ color: 'var(--champagne)', borderColor: 'var(--border-gold)', background: 'rgba(10, 17, 40, 0.7)' }}
            >
              <i className="bi bi-shield-check" style={{ color: 'var(--antique-gold)' }}></i>
              <span className="d-none d-lg-inline" style={{ fontSize: '0.85rem' }}>
                {currentUser ? `${currentUser.fullName} (${currentUser.role})` : 'Select Persona'}
              </span>
              <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem', opacity: 0.7 }}></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-lg" style={{ background: 'var(--midnight)', border: '1px solid var(--border-gold)', minWidth: '280px' }}>
              <li>
                <div className="px-3 py-2 text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'var(--antique-gold)' }}>
                  Textile Authorization Clearance
                </div>
              </li>
              {users.filter(u => u.approved).map(u => (
                <li key={u.userId}>
                  <button
                    className={`dropdown-item d-flex justify-content-between align-items-center py-2 px-3 ${currentUser?.username === u.username ? 'active' : ''}`}
                    style={{
                      color: currentUser?.username === u.username ? '#FFFFFF' : 'var(--champagne)',
                      background: currentUser?.username === u.username ? 'var(--heritage-burgundy)' : 'transparent',
                      fontSize: '0.86rem'
                    }}
                    onClick={() => {
                      switchUser(u.username);
                      setCurrentView('dashboard');
                    }}
                  >
                    <div>
                      <div className="fw-semibold">{u.fullName}</div>
                      <small style={{ opacity: 0.7, fontSize: '0.74rem' }}>@{u.username}</small>
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        letterSpacing: '0.08em',
                        color: u.role === 'ADMIN' ? '#F87171' : u.role === 'OWNER' ? 'var(--antique-gold)' : '#34D399',
                        fontWeight: 600
                      }}
                    >
                      {u.role}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications bell */}
          {currentUser && (
            <button
              type="button"
              className="btn btn-sm position-relative text-light rounded-circle p-2"
              style={{ background: 'rgba(198, 161, 91, 0.1)', border: '1px solid var(--border-gold)', color: 'var(--champagne)' }}
              onClick={() => setCurrentView('notifications')}
              title={t('nav.notifications')}
            >
              <i className="bi bi-bell" style={{ color: 'var(--champagne)' }}></i>
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle rounded-circle"
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--antique-gold)',
                    boxShadow: '0 0 8px var(--antique-gold)'
                  }}
                ></span>
              )}
            </button>
          )}

          {/* Dark / Gold Light mode toggle */}
          <button
            type="button"
            className="btn btn-sm rounded-circle p-2"
            style={{ background: 'rgba(198, 161, 91, 0.1)', border: '1px solid var(--border-gold)', color: 'var(--champagne)' }}
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Warm Ivory Mode' : 'Switch to Midnight Obsidian Mode'}
          >
            <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-stars'}`} style={{ color: 'var(--antique-gold)' }}></i>
          </button>

          {/* Language Selector */}
          <div className="dropdown">
            <button
              className="btn btn-sm d-flex align-items-center gap-1 fw-semibold"
              style={{
                background: 'rgba(198, 161, 91, 0.1)',
                border: '1px solid var(--border-gold)',
                color: 'var(--champagne)',
                borderRadius: '8px',
                padding: '6px 14px'
              }}
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-translate" style={{ color: 'var(--antique-gold)' }}></i>
              <span style={{ fontSize: '0.84rem' }}>{language === 'ta' ? 'தமிழ்' : 'English'}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-lg" style={{ background: 'var(--midnight)', border: '1px solid var(--border-gold)' }}>
              <li>
                <button
                  className={`dropdown-item ${language === 'en' ? 'active' : ''}`}
                  style={{
                    color: language === 'en' ? '#FFFFFF' : 'var(--champagne)',
                    background: language === 'en' ? 'var(--heritage-burgundy)' : 'transparent',
                    fontSize: '0.86rem'
                  }}
                  onClick={() => setLanguage('en')}
                >
                  English (United Kingdom)
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${language === 'ta' ? 'active' : ''}`}
                  style={{
                    color: language === 'ta' ? '#FFFFFF' : 'var(--champagne)',
                    background: language === 'ta' ? 'var(--heritage-burgundy)' : 'transparent',
                    fontSize: '0.86rem'
                  }}
                  onClick={() => setLanguage('ta')}
                >
                  தமிழ் (Tamil)
                </button>
              </li>
            </ul>
          </div>

          {/* User Profile / Auth buttons */}
          {currentUser ? (
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm d-flex align-items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(100, 21, 47, 0.4), rgba(16, 24, 43, 0.8))',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--champagne)',
                  borderRadius: '8px',
                  padding: '6px 12px'
                }}
                onClick={() => setCurrentView('profile')}
              >
                <i className="bi bi-person-circle" style={{ color: 'var(--antique-gold)' }}></i>
                <span className="d-none d-sm-inline fw-semibold" style={{ fontSize: '0.84rem' }}>
                  {currentUser.username}
                </span>
              </button>
              <button
                className="btn btn-sm rounded-circle p-2"
                style={{ border: '1px solid rgba(220, 38, 38, 0.4)', color: '#F87171' }}
                onClick={() => {
                  logout();
                  setCurrentView('login');
                }}
                title={t('nav.logout')}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <button
                className={`btn btn-sm ${currentView === 'login' ? 'btn-luxury-gold' : 'btn-luxury-outline'}`}
                onClick={() => setCurrentView('login')}
              >
                {t('nav.login')}
              </button>
              <button
                className={`btn btn-sm ${currentView === 'register' ? 'btn-luxury-gold' : 'btn-luxury-burgundy'}`}
                onClick={() => setCurrentView('register')}
              >
                {t('nav.register')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
