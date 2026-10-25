# TRIZEN — Smart Textile Management System (React SPA)

A modern, responsive React + TypeScript Enterprise Resource Planning (ERP) and tracking system for the textile industry. Rewritten from the original Dynamic/Spring Boot application, preserving 100% of the business logic, workflow stages, and data structures.

## Core Features & Modules

### 1. Multi-Role User Authentication & Governance
- **Role-Based Access Control**:
  - **ADMIN**: User approvals, system audit activity logs, platform statistics, and operator registry.
  - **OWNER**: Customer order creation, worker assignment, 6-stage production tracking, payment disbursement tracking, and material inventory management.
  - **WORKER**: Assigned tasks queue, order acceptance/rejection, expected delivery schedule commitments, work delivery history, and earnings ledger.
- **Quick Demo Role Switcher**: One-click profile selector in the topbar allows instant switching between `demo_admin`, `demo_owner1`, `demo_owner2`, and worker accounts without relogin hurdles.
- **Self-Service Registration**: Worker and owner signups with automatic submission to the administrative approval queue.

### 2. Process Stage Tracking
- Visual step pipeline monitoring 6 sequential stages:
  1. `Cutting`
  2. `Stitching`
  3. `Dyeing`
  4. `Finishing`
  5. `Packing`
  6. `Completed`
- Real-time stage advance buttons, status selectors, and floor operator allocation.

### 3. Order & Payment Management
- Create customer orders with product name, quantity, delivery deadlines, and technical specifications.
- Operator assignment with worker department and skill matching.
- Worker order acceptance, schedule date updating, and completion certification.
- Financial disbursements ledger tracking paid and pending payouts in Indian Rupees (₹).

### 4. Stock & Inventory Management
- Material inventory tracking for fabrics, yarns, consumables, trims, and packaging supplies.
- Automated threshold badges for Available (>10 units), Low Stock (1–10 units), and Out of Stock (0 units).
- Real-time search and category filtering.

### 5. Exportable Business Intelligence Reports
- Client-side document and data generation matching original controllers:
  - **Worker Roster Report**: Formatted PDF and XLSX spreadsheet.
  - **Owner Orders Report**: Formatted PDF and XLSX spreadsheet.
  - **Production Stage Report**: Formatted PDF and XLSX spreadsheet.
  - **Filtered Booking Report**: Formatted PDF and XLSX spreadsheet with status filtering.
  - **Payment & Completed Deliveries Report**: Formatted PDF and XLSX spreadsheet with financial rollups.

### 6. Bilingual Support & Theming
- Instant English & Tamil (தமிழ்) language switching for navigation, metrics, statuses, and headers.
- Dark mode and Light mode toggle with glassmorphism UI cards.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Bootstrap 5.3 + Bootstrap Icons + Custom Enterprise CSS (`src/styles/style.css`)
- **Document Generation**: `jspdf`, `jspdf-autotable`, `xlsx`
- **State Management**: React Context (`AppContext`) with automatic `localStorage` persistence

## Running the Application

```bash
# Start development server on port 3000
npm run dev

# Build for production
npm run build
```
