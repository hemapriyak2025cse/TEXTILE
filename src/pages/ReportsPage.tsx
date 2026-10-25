import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportReports } from '../utils/exportReports';

interface ReportsPageProps {
  setCurrentView: (view: string) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ setCurrentView }) => {
  const { workers, orders, productionOrders, payments, stocks, t } = useApp();
  const [bookingStatusFilter, setBookingStatusFilter] = useState('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status.toLowerCase() === 'completed').length;
  const pendingOrders = orders.filter(o => o.status.toLowerCase() === 'pending').length;
  const totalStock = stocks.reduce((acc, s) => acc + s.quantity, 0);
  const totalWorkers = workers.length;

  const triggerExport = (label: string, fn: () => void) => {
    try {
      fn();
      setExportNotice(`Generated ${label} successfully.`);
      setTimeout(() => setExportNotice(null), 3500);
    } catch (err) {
      console.error(err);
      setExportNotice(`Export failed: ${String(err)}`);
    }
  };

  return (
    <div className="anim-fade-up">
      {/* Manufacturing Analytics & Export Header */}
      <div className="luxury-header-block flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ color: 'var(--antique-gold)', fontSize: '0.9rem' }}>✦ MANUFACTURING INTELLIGENCE &amp; AUDIT</span>
            <span className="status-pip in-progress">Exportable Ledgers</span>
          </div>
          <h2>TRIZEN Analytics &amp; Operational Reports</h2>
          <small>
            Generate high-resolution PDF certificates and archival Excel ledgers across machines, operators, production batches, and disbursements
          </small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button 
            className="btn-luxury-outline d-flex align-items-center gap-2 text-decoration-none"
            onClick={() => setCurrentView('dashboard')}
          >
            <i className="bi bi-arrow-left"></i>
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div 
          className="p-3 mb-4 rounded-3 d-flex align-items-center gap-3 anim-fade-up"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 24, 43, 0.95), rgba(10, 13, 22, 0.98))',
            border: '1px solid var(--antique-gold)',
            color: 'var(--champagne)',
            boxShadow: 'var(--shadow-luxury)'
          }}
        >
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: '36px', height: '36px', background: 'rgba(198, 161, 91, 0.2)', border: '1px solid var(--antique-gold)' }}
          >
            <i className="bi bi-file-earmark-check text-gold"></i>
          </div>
          <div>
            <div className="fw-semibold text-white">{exportNotice}</div>
            <small style={{ color: 'var(--champagne)', opacity: 0.8 }}>File generated and downloaded to your local device archive.</small>
          </div>
        </div>
      )}

      {/* Luxury KPI Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <div className="kpi-value">{totalOrders}</div>
            <div className="kpi-label">Total Commissions</div>
            <div className="mt-2 pt-2 border-top border-light text-muted small d-flex justify-content-between">
              <span>Bespoke orders</span>
              <span className="text-gold">100% Weave Log</span>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold">
              <i className="bi bi-patch-check-fill"></i>
            </div>
            <div className="kpi-value">{completedOrders}</div>
            <div className="kpi-label">Delivered Silks</div>
            <div className="mt-2 pt-2 border-top border-light text-muted small d-flex justify-content-between">
              <span>Sealed &amp; Delivered</span>
              <span className="text-success fw-bold">Pure Zari</span>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy">
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div className="kpi-value">{pendingOrders}</div>
            <div className="kpi-label">Active Loom Runs</div>
            <div className="mt-2 pt-2 border-top border-light text-muted small d-flex justify-content-between">
              <span>In Queue / Warping</span>
              <span className="text-gold">High Priority</span>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy">
              <i className="bi bi-box-seam-fill"></i>
            </div>
            <div className="kpi-value">{totalStock.toLocaleString()}</div>
            <div className="kpi-label">Vault Units</div>
            <div className="mt-2 pt-2 border-top border-light text-muted small d-flex justify-content-between">
              <span>Raw Silk &amp; Zari</span>
              <span className="text-secondary">Secured</span>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-charcoal">
              <i className="bi bi-people-fill"></i>
            </div>
            <div className="kpi-value">{totalWorkers}</div>
            <div className="kpi-label">Master Artisans</div>
            <div className="mt-2 pt-2 border-top border-light text-muted small d-flex justify-content-between">
              <span>Guild Certified</span>
              <span className="text-gold">Kanchipuram</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Report Generators in Luxury Grid */}
      <div className="row g-4">
        {/* 1. Worker Report */}
        <div className="col-md-6 col-lg-4">
          <div className="luxury-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '46px', 
                    height: '46px', 
                    background: 'linear-gradient(135deg, var(--royal-navy), var(--midnight))',
                    border: '1px solid var(--antique-gold)',
                    color: 'var(--champagne)'
                  }}
                >
                  <i className="bi bi-person-lines-fill fs-5 text-gold"></i>
                </div>
                <span className="status-pip completed">{workers.length} Craftsmen</span>
              </div>
              <h5 className="font-heading mb-2 text-dark" style={{ letterSpacing: '0.04em' }}>
                Artisan Guild Roster Dossier
              </h5>
              <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>
                Master weavers roster with loom certifications, silk craft specializations, floor assignments, and authenticated contact records.
              </p>
              <div className="py-2 px-3 rounded-2 mb-4" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <div className="d-flex justify-content-between text-muted small">
                  <span>Scope:</span>
                  <strong className="text-dark">All Weaving Lofts</strong>
                </div>
                <div className="d-flex justify-content-between text-muted small mt-1">
                  <span>Certified Records:</span>
                  <strong className="text-gold">{workers.length} Active Artisans</strong>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn-luxury-burgundy flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport('Artisan Roster PDF Dossier', () => exportReports.workerPdf(workers))}
              >
                <i className="bi bi-file-earmark-pdf"></i>
                <span>PDF Dossier</span>
              </button>
              <button
                className="btn-luxury-gold flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport('Artisan Roster Excel Ledger', () => exportReports.workerExcel(workers))}
              >
                <i className="bi bi-file-earmark-excel"></i>
                <span>Excel Ledger</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Owner Orders Report */}
        <div className="col-md-6 col-lg-4">
          <div className="luxury-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '46px', 
                    height: '46px', 
                    background: 'linear-gradient(135deg, var(--heritage-burgundy), var(--midnight))',
                    border: '1px solid var(--antique-gold)',
                    color: 'var(--champagne)'
                  }}
                >
                  <i className="bi bi-journal-text fs-5 text-gold"></i>
                </div>
                <span className="status-pip in-progress">{orders.length} Commissions</span>
              </div>
              <h5 className="font-heading mb-2 text-dark" style={{ letterSpacing: '0.04em' }}>
                Imperial Orders Master Register
              </h5>
              <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>
                Complete commercial overview of high-end bridal commissions, silk weave specs, allocated master weavers, and production milestones.
              </p>
              <div className="py-2 px-3 rounded-2 mb-4" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <div className="d-flex justify-content-between text-muted small">
                  <span>Scope:</span>
                  <strong className="text-dark">Commercial &amp; Royal Orders</strong>
                </div>
                <div className="d-flex justify-content-between text-muted small mt-1">
                  <span>Total Weave Batches:</span>
                  <strong className="text-gold">{orders.length} Commission Files</strong>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn-luxury-burgundy flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport('Imperial Orders PDF Register', () => exportReports.ownerPdf(orders))}
              >
                <i className="bi bi-file-earmark-pdf"></i>
                <span>PDF Dossier</span>
              </button>
              <button
                className="btn-luxury-gold flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport('Imperial Orders Excel Register', () => exportReports.ownerExcel(orders))}
              >
                <i className="bi bi-file-earmark-excel"></i>
                <span>Excel Ledger</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Production Report */}
        <div className="col-md-6 col-lg-4">
          <div className="luxury-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '46px', 
                    height: '46px', 
                    background: 'linear-gradient(135deg, #1C2438, var(--midnight))',
                    border: '1px solid var(--antique-gold)',
                    color: 'var(--champagne)'
                  }}
                >
                  <i className="bi bi-diagram-3-fill fs-5 text-gold"></i>
                </div>
                <span className="status-pip active">{productionOrders.length} Runs</span>
              </div>
              <h5 className="font-heading mb-2 text-dark" style={{ letterSpacing: '0.04em' }}>
                Handloom Stage Routing Log
              </h5>
              <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>
                Detailed 6-stage loom traversal records (Cutting, Stitching, Dyeing, Finishing, Packing, Completed) with artisan sign-offs and deadlines.
              </p>
              <div className="py-2 px-3 rounded-2 mb-4" style={{ background: '#FAF7F0', border: '1px solid var(--border-light)' }}>
                <div className="d-flex justify-content-between text-muted small">
                  <span>Routing Protocol:</span>
                  <strong className="text-dark">6-Stage Textile Pipeline</strong>
                </div>
                <div className="d-flex justify-content-between text-muted small mt-1">
                  <span>Tracked Batches:</span>
                  <strong className="text-gold">{productionOrders.length} Floor Batches</strong>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn-luxury-burgundy flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport('Production Routing PDF Log', () => exportReports.productionPdf(productionOrders))}
              >
                <i className="bi bi-file-earmark-pdf"></i>
                <span>PDF Dossier</span>
              </button>
              <button
                className="btn-luxury-gold flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport('Production Routing Excel Log', () => exportReports.productionExcel(productionOrders))}
              >
                <i className="bi bi-file-earmark-excel"></i>
                <span>Excel Ledger</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Filtered Booking Report */}
        <div className="col-md-6 col-lg-6">
          <div className="luxury-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '46px', 
                    height: '46px', 
                    background: 'linear-gradient(135deg, var(--royal-navy), var(--heritage-burgundy))',
                    border: '1px solid var(--antique-gold)',
                    color: 'var(--champagne)'
                  }}
                >
                  <i className="bi bi-calendar-range-fill fs-5 text-gold"></i>
                </div>
                <span className="status-pip pending">Segmented Audit</span>
              </div>
              <h5 className="font-heading mb-2 text-dark" style={{ letterSpacing: '0.04em' }}>
                Filtered Booking &amp; Delivery Schedule
              </h5>
              <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>
                Client bespoke bookings filtered by active status, showcasing expected delivery dates, pure silk specifications, and fulfillment queues.
              </p>
              
              <div className="p-3 rounded-2 mb-4" style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)' }}>
                <label className="form-label small fw-bold text-dark mb-1">Select Weave Status Clearance</label>
                <select
                  className="form-select"
                  style={{
                    borderColor: 'var(--border-gold)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    background: '#FFFFFF'
                  }}
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses ({orders.length} total orders)</option>
                  <option value="PENDING">Pending Commissioning Only</option>
                  <option value="IN PROGRESS">Active on Handlooms Only</option>
                  <option value="Completed">Completed &amp; Quality Sealed Only</option>
                  <option value="Accepted">Craftsman Accepted Only</option>
                  <option value="Rejected">Declined / Revision Required</option>
                </select>
                <small className="text-muted d-block mt-2">
                  Filters PDF &amp; Excel sheets dynamically based on chosen status criteria.
                </small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn-luxury-burgundy flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport(`Booking Schedule (${bookingStatusFilter || 'All'}) PDF`, () => exportReports.bookingPdf(orders, bookingStatusFilter))}
              >
                <i className="bi bi-file-earmark-pdf"></i>
                <span>Filtered PDF</span>
              </button>
              <button
                className="btn-luxury-gold flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport(`Booking Schedule (${bookingStatusFilter || 'All'}) Excel`, () => exportReports.bookingExcel(orders, bookingStatusFilter))}
              >
                <i className="bi bi-file-earmark-excel"></i>
                <span>Filtered Excel</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Payment & Completed Deliveries Report */}
        <div className="col-md-6 col-lg-6">
          <div className="luxury-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '46px', 
                    height: '46px', 
                    background: 'linear-gradient(135deg, var(--antique-gold-dark), var(--midnight))',
                    border: '1px solid var(--antique-gold)',
                    color: 'var(--champagne)'
                  }}
                >
                  <i className="bi bi-currency-rupee fs-5 text-gold"></i>
                </div>
                <span className="status-pip completed">Audited Treasury</span>
              </div>
              <h5 className="font-heading mb-2 text-dark" style={{ letterSpacing: '0.04em' }}>
                Treasury &amp; Artisan Compensation Audit
              </h5>
              <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>
                Complete financial reconciliation of completed luxury deliveries, cumulative yardage disbursements, bank reference vouchers, and artisan payouts in Indian Rupees (₹).
              </p>
              
              <div className="p-3 rounded-2 mb-4" style={{ background: '#FAF7F0', border: '1px solid var(--border-gold)' }}>
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Completed Delivery Audits:</span>
                  <strong className="text-success">{orders.filter(o => o.status.toLowerCase() === 'completed').length} Verified Deliveries</strong>
                </div>
                <div className="d-flex justify-content-between text-muted small">
                  <span>Disbursement Slips:</span>
                  <strong className="text-gold">{payments.length} Registered Treasury Records</strong>
                </div>
                <small className="text-muted d-block mt-2">
                  Includes bank transaction reference IDs, date stamps, and weaver account verification.
                </small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn-luxury-burgundy flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport('Treasury & Compensation PDF Audit', () => exportReports.paymentPdf(orders, payments))}
              >
                <i className="bi bi-file-earmark-pdf"></i>
                <span>Treasury PDF</span>
              </button>
              <button
                className="btn-luxury-gold flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => triggerExport('Treasury & Compensation Excel Audit', () => exportReports.paymentExcel(orders, payments))}
              >
                <i className="bi bi-file-earmark-excel"></i>
                <span>Treasury Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
