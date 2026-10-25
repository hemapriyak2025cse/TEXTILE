import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface StockSearchProps {
  setCurrentView: (view: string) => void;
}

export const StockSearch: React.FC<StockSearchProps> = ({ setCurrentView }) => {
  const { stocks, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const totalStock = stocks.reduce((acc, s) => acc + s.quantity, 0);
  const availableCount = stocks.filter(s => s.quantity > 10).length;
  const lowStockCount = stocks.filter(s => s.quantity > 0 && s.quantity <= 10).length;
  const outOfStockCount = stocks.filter(s => s.quantity === 0).length;

  const filteredStocks = stocks.filter(s => {
    const matchesName = s.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || s.category === categoryFilter;
    return matchesName && matchesCategory;
  });

  const categories = ['ALL', 'Fabric', 'Consumable', 'Accessory', 'Packaging', 'Finished Goods'];

  return (
    <div className="anim-fade-up">
      {/* Luxury Topbar */}
      <div className="luxury-header-block">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--antique-gold)', fontWeight: 700 }}>
              Silk Hank &amp; Zari Bullion Vault
            </span>
            <span style={{ color: 'var(--antique-gold)', opacity: 0.5 }}>✦</span>
            <span className="text-muted small">Raw Materials Inventory</span>
          </div>
          <h2>Pure Silk &amp; Zari Inventory</h2>
          <small>Real-time audit of mulberry silk spools, silver-gilt zari bullion, natural vat chemicals, and packaging</small>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-gold"><i className="bi bi-gem"></i></div>
            <div className="kpi-value">{totalStock.toLocaleString()}</div>
            <div className="kpi-label">Total Material Units in Vault</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-navy"><i className="bi bi-check2-circle"></i></div>
            <div className="kpi-value">{availableCount}</div>
            <div className="kpi-label">Ample Stocks (&gt;10 units)</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-burgundy"><i className="bi bi-exclamation-triangle"></i></div>
            <div className="kpi-value">{lowStockCount}</div>
            <div className="kpi-label">Low Reserve (1-10 units)</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-luxury-card">
            <div className="kpi-icon-wrap kpi-icon-charcoal"><i className="bi bi-x-circle"></i></div>
            <div className="kpi-value">{outOfStockCount}</div>
            <div className="kpi-label">Depleted &bull; Action Required</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="luxury-card p-4">
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text" style={{ background: '#FAF7F0', borderColor: 'var(--border-gold)', color: 'var(--antique-gold-dark)' }}>
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control-luxury"
                style={{ borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                placeholder="Search by silk specification, yarn count, or godown vault..."
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
          <div className="col-md-4">
            <select
              className="form-select-luxury"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Material Categories' : c === 'Fabric' ? 'Pure Silk Fabrics & Hanks' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stock Table */}
        <div className="table-responsive">
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Vault #</th>
                <th>Material &amp; Silk Specification</th>
                <th>Category</th>
                <th>Storage Loft / Godown</th>
                <th>Available Quantity</th>
                <th>Reserve Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    No inventory records match the query.
                  </td>
                </tr>
              ) : (
                filteredStocks.map(stock => {
                  let pipClass = 'available';
                  let label = 'Ample Reserve';
                  if (stock.quantity === 0) {
                    pipClass = 'out-of-stock';
                    label = 'Depleted';
                  } else if (stock.quantity <= 10) {
                    pipClass = 'low-stock';
                    label = 'Low Reserve';
                  }

                  return (
                    <tr key={stock.id}>
                      <td>
                        <strong style={{ color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>#{stock.id}</strong>
                      </td>
                      <td>
                        <div className="fw-semibold" style={{ color: 'var(--midnight)' }}>{stock.productName}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', color: '#6C7282' }}>
                          {stock.category}
                        </span>
                      </td>
                      <td>
                        <i className="bi bi-geo-alt me-1" style={{ color: 'var(--antique-gold)' }}></i>
                        {stock.location}
                      </td>
                      <td>
                        <span className="fw-bold" style={{ fontSize: '1rem', color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
                          {stock.quantity.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className={`status-pip ${pipClass}`}>
                          {label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
