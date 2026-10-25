import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { OwnerOrders } from './pages/OwnerOrders';
import { CreateOrder } from './pages/CreateOrder';
import { ProductionTracking } from './pages/ProductionTracking';
import { ProductionBatch } from './pages/ProductionBatch';
import { PaymentTracking } from './pages/PaymentTracking';
import { StockSearch } from './pages/StockSearch';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { WorkerMyTasks } from './pages/WorkerMyTasks';
import { WorkerOrders } from './pages/WorkerOrders';
import { WorkerWorkHistory } from './pages/WorkerWorkHistory';
import { WorkerPaymentHistory } from './pages/WorkerPaymentHistory';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AdminActivityLogs } from './pages/AdminActivityLogs';
import { WorkersPage } from './pages/WorkersPage';
import { TasksPage } from './pages/TasksPage';
import { ProductionOrdersPage } from './pages/ProductionOrdersPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';

export const AppContent: React.FC = () => {
  const { currentUser } = useApp();
  const [currentView, setCurrentView] = useState<string>(currentUser ? 'dashboard' : 'home');

  const renderDashboard = () => {
    if (!currentUser) return <HomePage setCurrentView={setCurrentView} />;
    switch (currentUser.role) {
      case 'ADMIN':
        return <AdminDashboard setCurrentView={setCurrentView} />;
      case 'WORKER':
        return <WorkerDashboard setCurrentView={setCurrentView} />;
      case 'OWNER':
      default:
        return <OwnerDashboard setCurrentView={setCurrentView} />;
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage setCurrentView={setCurrentView} />;
      case 'login':
        return <LoginPage setCurrentView={setCurrentView} />;
      case 'register':
        return <RegisterPage setCurrentView={setCurrentView} />;
      case 'dashboard':
        return renderDashboard();
      case 'owner-orders':
        return <OwnerOrders setCurrentView={setCurrentView} />;
      case 'create-order':
        return <CreateOrder setCurrentView={setCurrentView} />;
      case 'production-tracking':
        return <ProductionTracking setCurrentView={setCurrentView} />;
      case 'production-batch':
        return <ProductionBatch setCurrentView={setCurrentView} />;
      case 'payment-tracking':
        return <PaymentTracking setCurrentView={setCurrentView} />;
      case 'stock-search':
        return <StockSearch setCurrentView={setCurrentView} />;
      case 'worker-my-tasks':
        return <WorkerMyTasks setCurrentView={setCurrentView} />;
      case 'worker-orders':
        return <WorkerOrders setCurrentView={setCurrentView} />;
      case 'worker-history':
        return <WorkerWorkHistory setCurrentView={setCurrentView} />;
      case 'worker-payments':
        return <WorkerPaymentHistory setCurrentView={setCurrentView} />;
      case 'admin-users':
        return <AdminUsers setCurrentView={setCurrentView} />;
      case 'admin-logs':
        return <AdminActivityLogs setCurrentView={setCurrentView} />;
      case 'workers':
        return <WorkersPage setCurrentView={setCurrentView} />;
      case 'tasks':
        return <TasksPage setCurrentView={setCurrentView} />;
      case 'production-orders':
        return <ProductionOrdersPage setCurrentView={setCurrentView} />;
      case 'reports':
        return <ReportsPage setCurrentView={setCurrentView} />;
      case 'notifications':
        return <NotificationsPage setCurrentView={setCurrentView} />;
      case 'profile':
        return <ProfilePage setCurrentView={setCurrentView} />;
      default:
        return renderDashboard();
    }
  };

  // If user is authenticated, render with luxury sidebar layout
  if (currentUser && currentView !== 'home' && currentView !== 'login' && currentView !== 'register') {
    return (
      <div className="min-vh-100 d-flex flex-column" style={{ background: '#F8F5EE' }}>
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        <div className="wrapper">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
          <main className="main-content d-flex flex-column justify-content-between">
            <div className="container-fluid py-2">
              {renderCurrentView()}
            </div>
            
            {/* Authenticated subtle luxury footer */}
            <footer 
              className="mt-5 pt-3 pb-2 text-center text-muted small"
              style={{ borderTop: '1px solid var(--border-gold)', fontSize: '0.82rem' }}
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="font-heading fw-bold" style={{ color: 'var(--antique-gold)' }}>TRIZEN</span>
                  <span>— Smart Textile Tracking &amp; Industrial Operations Platform</span>
                </div>
                <div>
                  Continuous Textile Manufacturing &bull; Multi-Role Operations &bull; &copy; 2026 TRIZEN
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="status-pip completed">Looms Online</span>
                  <span style={{ color: 'var(--antique-gold)' }}>English &amp; தமிழ்</span>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    );
  }

  // Guest / standalone layout (Home, Login, Register)
  const isFullscreenLogin = currentView === 'login';

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: isFullscreenLogin ? '#0A1128' : '#F8F9FA' }}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className={`flex-grow-1 ${isFullscreenLogin ? 'p-0 overflow-hidden' : 'container py-4'}`}>
        {renderCurrentView()}
      </main>
      
      {/* Modern Industrial Luxury Guest Footer */}
      <footer 
        className="py-4 text-center mt-auto"
        style={{
          background: 'linear-gradient(180deg, var(--midnight) 0%, #080D1A 100%)',
          borderTop: '1px solid var(--antique-gold)',
          color: 'var(--champagne)'
        }}
      >
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 small">
            <div className="d-flex align-items-center gap-2">
              <div 
                className="rounded-2 d-flex align-items-center justify-content-center"
                style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #0A1128, #162444)', border: '1px solid var(--antique-gold)' }}
              >
                <i className="bi bi-bezier2 text-gold" style={{ fontSize: '0.78rem' }}></i>
              </div>
              <span className="font-heading fw-bold" style={{ color: '#FFFFFF', letterSpacing: '0.08em' }}>
                TRIZEN
              </span>
            </div>
            
            <div style={{ color: 'var(--champagne)', opacity: 0.85 }}>
              &copy; 2026 TRIZEN Smart Textile Tracking System. Intelligent Mill Governance &amp; Production Management.
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <span style={{ color: 'var(--antique-gold)' }}>Continuous Textile Weaving Architecture</span>
              <span className="badge rounded-pill" style={{ background: 'rgba(198, 161, 91, 0.2)', color: 'var(--champagne)', border: '1px solid var(--antique-gold)' }}>
                English &bull; தமிழ்
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
