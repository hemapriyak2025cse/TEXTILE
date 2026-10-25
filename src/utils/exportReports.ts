import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Worker, Order, ProductionOrder, Payment } from '../types';

export const exportReports = {
  // 1. Worker Report
  workerPdf: (workers: Worker[]) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(16);
    doc.setTextColor(13, 110, 253);
    doc.text('TRIZEN — Worker Report', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const rows = workers.map((w, index) => [
      index + 1,
      w.workerName,
      w.skill,
      w.department,
      w.phoneNumber,
      w.availability
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['#', 'Name', 'Skill', 'Department', 'Phone', 'Availability']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }
    });

    doc.save('worker-report.pdf');
  },

  workerExcel: (workers: Worker[]) => {
    const data = workers.map((w, index) => ({
      '#': index + 1,
      Name: w.workerName,
      Skill: w.skill,
      Department: w.department,
      Phone: w.phoneNumber,
      Availability: w.availability
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Workers');
    XLSX.writeFile(wb, 'worker-report.xlsx');
  },

  // 2. Owner Report
  ownerPdf: (orders: Order[]) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(16);
    doc.setTextColor(13, 110, 253);
    doc.text('TRIZEN — Owner Report', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const rows = orders.map((o, index) => [
      index + 1,
      o.productName,
      o.quantity,
      o.ownerUsername,
      o.workerUsername || '-',
      o.status,
      o.requestDate || '-'
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['#', 'Product', 'Qty', 'Owner', 'Worker', 'Status', 'Request Date']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }
    });

    doc.save('owner-report.pdf');
  },

  ownerExcel: (orders: Order[]) => {
    const data = orders.map((o, index) => ({
      '#': index + 1,
      Product: o.productName,
      Qty: o.quantity,
      Owner: o.ownerUsername,
      Worker: o.workerUsername || '-',
      Status: o.status,
      'Request Date': o.requestDate || '-'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Owner Orders');
    XLSX.writeFile(wb, 'owner-report.xlsx');
  },

  // 3. Production Report
  productionPdf: (batches: ProductionOrder[]) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(16);
    doc.setTextColor(13, 110, 253);
    doc.text('TRIZEN — Production Report', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const rows = batches.map((p, index) => [
      index + 1,
      p.orderNumber,
      p.productName,
      p.quantity,
      p.currentStage,
      p.status,
      p.deadline
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['#', 'Order No.', 'Product', 'Qty', 'Current Stage', 'Status', 'Deadline']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }
    });

    doc.save('production-report.pdf');
  },

  productionExcel: (batches: ProductionOrder[]) => {
    const data = batches.map((p, index) => ({
      '#': index + 1,
      'Order No.': p.orderNumber,
      Product: p.productName,
      Qty: p.quantity,
      'Current Stage': p.currentStage,
      Status: p.status,
      Deadline: p.deadline
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Production');
    XLSX.writeFile(wb, 'production-report.xlsx');
  },

  // 4. Booking Report
  bookingPdf: (orders: Order[], statusFilter = '') => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(16);
    doc.setTextColor(13, 110, 253);
    const title = 'TRIZEN — Booking Report' + (statusFilter ? ` — ${statusFilter}` : '');
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const filtered = statusFilter ? orders.filter(o => o.status.toLowerCase() === statusFilter.toLowerCase()) : orders;
    const rows = filtered.map((o, index) => [
      index + 1,
      o.productName,
      o.quantity,
      o.ownerUsername,
      o.workerUsername || '-',
      o.status,
      o.requestDate || '-',
      o.expectedDeliveryDate || '-'
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['#', 'Product', 'Qty', 'Owner', 'Worker', 'Status', 'Request Date', 'Delivery Date']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }
    });

    doc.save('booking-report.pdf');
  },

  bookingExcel: (orders: Order[], statusFilter = '') => {
    const filtered = statusFilter ? orders.filter(o => o.status.toLowerCase() === statusFilter.toLowerCase()) : orders;
    const data = filtered.map((o, index) => ({
      '#': index + 1,
      Product: o.productName,
      Qty: o.quantity,
      Owner: o.ownerUsername,
      Worker: o.workerUsername || '-',
      Status: o.status,
      'Request Date': o.requestDate || '-',
      'Delivery Date': o.expectedDeliveryDate || '-'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
    XLSX.writeFile(wb, 'booking-report.xlsx');
  },

  // 5. Payment Report
  paymentPdf: (orders: Order[], payments: Payment[]) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(16);
    doc.setTextColor(13, 110, 253);
    doc.text('TRIZEN — Payment & Completed Jobs Report', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const completed = orders.filter(o => o.status.toLowerCase() === 'completed');
    const totalQty = completed.reduce((sum, o) => sum + o.quantity, 0);
    const totalPaid = payments.filter(p => p.paymentStatus.toLowerCase() === 'paid').reduce((sum, p) => sum + p.amount, 0);

    const rows = completed.map((o, index) => [
      index + 1,
      o.productName,
      o.quantity,
      o.ownerUsername,
      o.workerUsername || '-',
      o.expectedDeliveryDate || '-'
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['#', 'Product', 'Qty Completed', 'Owner', 'Worker', 'Delivery Date']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }
    });

    const finalY = (doc as any).lastAutoTable?.finalY || 100;
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(`Total Completed Jobs: ${completed.length}    |    Total Units Produced: ${totalQty}    |    Total Payouts Settled: ₹${totalPaid.toLocaleString()}`, 14, finalY + 12);

    doc.save('payment-report.pdf');
  },

  paymentExcel: (orders: Order[], payments: Payment[]) => {
    const completed = orders.filter(o => o.status.toLowerCase() === 'completed');
    const totalQty = completed.reduce((sum, o) => sum + o.quantity, 0);
    const totalPaid = payments.filter(p => p.paymentStatus.toLowerCase() === 'paid').reduce((sum, p) => sum + p.amount, 0);

    const data = completed.map((o, index) => ({
      '#': index + 1,
      Product: o.productName,
      'Qty Completed': o.quantity,
      Owner: o.ownerUsername,
      Worker: o.workerUsername || '-',
      'Delivery Date': o.expectedDeliveryDate || '-'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.sheet_add_aoa(ws, [
      [],
      ['Total Completed Jobs:', completed.length],
      ['Total Units Produced:', totalQty],
      ['Total Settled Payments (₹):', totalPaid]
    ], { origin: -1 });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payments');
    XLSX.writeFile(wb, 'payment-report.xlsx');
  }
};
