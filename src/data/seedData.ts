import { User, Worker, Task, ProductionOrder, Order, Payment, Stock, ActivityLog, Notification } from '../types';

export const initialUsers: User[] = [
  {
    userId: 900001,
    username: 'demo_admin',
    password: 'Demo@123',
    fullName: 'System Administrator',
    email: 'admin@trizen.invalid',
    phone: '+91 90000 00001',
    address: 'Demo Administration Office, Tirupur, India',
    role: 'ADMIN',
    enabled: true,
    approved: true
  },
  {
    userId: 900002,
    username: 'demo_owner1',
    password: 'Demo@123',
    fullName: 'Demo Owner One (Textile Mill #1)',
    email: 'owner1@trizen.invalid',
    phone: '+91 90000 00002',
    address: 'Demo Owner Unit 1, Avinashi Road, Tirupur',
    role: 'OWNER',
    enabled: true,
    approved: true
  },
  {
    userId: 900003,
    username: 'demo_owner2',
    password: 'Demo@123',
    fullName: 'Demo Owner Two (Apparels Export)',
    email: 'owner2@trizen.invalid',
    phone: '+91 90000 00003',
    address: 'Demo Owner Unit 2, Palladam Road, Tirupur',
    role: 'OWNER',
    enabled: true,
    approved: true
  },
  {
    userId: 900004,
    username: 'demo_worker001',
    password: 'Demo@123',
    fullName: 'Aarav Krishnan',
    email: 'worker001@trizen.invalid',
    phone: '+91 90001 00001',
    address: 'Demo Worker Unit 1, Tirupur',
    role: 'WORKER',
    enabled: true,
    approved: true
  },
  {
    userId: 900005,
    username: 'demo_worker002',
    password: 'Demo@123',
    fullName: 'Meena Ramesh',
    email: 'worker002@trizen.invalid',
    phone: '+91 90001 00002',
    address: 'Demo Worker Unit 2, Tirupur',
    role: 'WORKER',
    enabled: true,
    approved: true
  },
  {
    userId: 900006,
    username: 'demo_worker003',
    password: 'Demo@123',
    fullName: 'Vishnu Prasad',
    email: 'worker003@trizen.invalid',
    phone: '+91 90001 00003',
    address: 'Demo Worker Unit 3, Tirupur',
    role: 'WORKER',
    enabled: true,
    approved: true
  },
  {
    userId: 900007,
    username: 'pending_applicant',
    password: 'Demo@123',
    fullName: 'Rajesh Kannan',
    email: 'rajesh.k@trizen.invalid',
    phone: '+91 98450 12345',
    address: 'Industrial Area, Coimbatore',
    role: 'WORKER',
    enabled: true,
    approved: false // Pending approval to test Admin approval workflow!
  }
];

export const initialWorkers: Worker[] = [
  { workerId: 1, workerName: 'demo_worker001', skill: 'Pattern Cutting', department: 'Cutting', phoneNumber: '+91 90001 00001', availability: 'Available' },
  { workerId: 2, workerName: 'demo_worker002', skill: 'Machine Stitching', department: 'Stitching', phoneNumber: '+91 90001 00002', availability: 'Busy' },
  { workerId: 3, workerName: 'demo_worker003', skill: 'Quality Inspection', department: 'Checking', phoneNumber: '+91 90001 00003', availability: 'Available' },
  { workerId: 4, workerName: 'demo_worker004', skill: 'Packing and Labelling', department: 'Packing', phoneNumber: '+91 90001 00004', availability: 'Available' },
  { workerId: 5, workerName: 'demo_worker005', skill: 'Straight Cutting', department: 'Cutting', phoneNumber: '+91 90001 00005', availability: 'Busy' },
  { workerId: 6, workerName: 'demo_worker006', skill: 'Overlock Stitching', department: 'Stitching', phoneNumber: '+91 90001 00006', availability: 'Available' },
  { workerId: 7, workerName: 'demo_worker007', skill: 'Measurement Checking', department: 'Checking', phoneNumber: '+91 90001 00007', availability: 'Busy' },
  { workerId: 8, workerName: 'demo_worker008', skill: 'Carton Packing', department: 'Packing', phoneNumber: '+91 90001 00008', availability: 'Available' },
  { workerId: 9, workerName: 'demo_worker009', skill: 'Marker Making', department: 'Cutting', phoneNumber: '+91 90001 00009', availability: 'Available' },
  { workerId: 10, workerName: 'demo_worker010', skill: 'Buttonhole Stitching', department: 'Stitching', phoneNumber: '+91 90001 00010', availability: 'Available' }
];

export const initialStocks: Stock[] = [
  { id: 1, productName: 'Cotton Fabric 60s', category: 'Fabric', location: 'Fabric Store A', quantity: 240 },
  { id: 2, productName: 'Polyester Blend Yarn', category: 'Fabric', location: 'Fabric Store B', quantity: 180 },
  { id: 3, productName: 'Silk Fabric Premium', category: 'Fabric', location: 'Premium Store', quantity: 45 },
  { id: 4, productName: 'Linen Fabric Raw', category: 'Fabric', location: 'Fabric Store A', quantity: 90 },
  { id: 5, productName: 'Denim Fabric 12oz', category: 'Fabric', location: 'Fabric Store B', quantity: 12 },
  { id: 6, productName: 'Cotton Thread Spools', category: 'Consumable', location: 'Thread Godown', quantity: 450 },
  { id: 7, productName: 'Polyester Thread High-Tensile', category: 'Consumable', location: 'Thread Godown', quantity: 320 },
  { id: 8, productName: 'Buttons 4-Hole Pearl', category: 'Accessory', location: 'Accessory Store', quantity: 5000 },
  { id: 9, productName: 'Metal Zippers 15cm', category: 'Accessory', location: 'Accessory Store', quantity: 800 },
  { id: 10, productName: 'Woven Brand Labels', category: 'Accessory', location: 'Accessory Store', quantity: 1200 },
  { id: 11, productName: 'Elastic Waistbands 1.5 inch', category: 'Accessory', location: 'Accessory Store', quantity: 25 },
  { id: 12, productName: 'Fusible Interlining', category: 'Consumable', location: 'Cutting Room', quantity: 70 },
  { id: 13, productName: 'Poly Packing Bags', category: 'Packaging', location: 'Packing Store', quantity: 2500 },
  { id: 14, productName: 'Corrugated Master Cartons', category: 'Packaging', location: 'Dispatch Store', quantity: 150 },
  { id: 15, productName: 'Pattern Paper Rolls', category: 'Consumable', location: 'Cutting Room', quantity: 8 }, // Low stock!
  { id: 16, productName: 'Industrial Sewing Needles DBx1', category: 'Consumable', location: 'Machine Store', quantity: 300 },
  { id: 17, productName: 'Aluminum Bobbins', category: 'Consumable', location: 'Machine Store', quantity: 110 },
  { id: 18, productName: 'Embroidered Lace Trim', category: 'Accessory', location: 'Accessory Store', quantity: 0 }, // Out of stock!
  { id: 19, productName: 'Eco Reactive Dye Chemicals', category: 'Consumable', location: 'Dyeing Unit', quantity: 18 },
  { id: 20, productName: 'Finished Cotton Shirts Pack', category: 'Finished Goods', location: 'Dispatch Store', quantity: 650 }
];

export const initialProductionOrders: ProductionOrder[] = [
  {
    orderId: 101,
    orderNumber: 'BATCH-2026-001',
    productName: 'Cotton Casual Shirt',
    quantity: 500,
    currentStage: 'Stitching',
    status: 'In Progress',
    assignedWorker: 'demo_worker002',
    deadline: '2026-11-15'
  },
  {
    orderId: 102,
    orderNumber: 'BATCH-2026-002',
    productName: 'Formal Trousers Slim Fit',
    quantity: 350,
    currentStage: 'Cutting',
    status: 'In Progress',
    assignedWorker: 'demo_worker001',
    deadline: '2026-11-20'
  },
  {
    orderId: 103,
    orderNumber: 'BATCH-2026-003',
    productName: 'Crew Neck Cotton T-Shirt',
    quantity: 1200,
    currentStage: 'Dyeing',
    status: 'In Progress',
    assignedWorker: 'demo_worker005',
    deadline: '2026-11-10'
  },
  {
    orderId: 104,
    orderNumber: 'BATCH-2026-004',
    productName: 'Checked Cotton Chudidhar',
    quantity: 400,
    currentStage: 'Finishing',
    status: 'In Progress',
    assignedWorker: 'demo_worker006',
    deadline: '2026-11-05'
  },
  {
    orderId: 105,
    orderNumber: 'BATCH-2026-005',
    productName: 'Premium Denim Jeans',
    quantity: 250,
    currentStage: 'Packing',
    status: 'In Progress',
    assignedWorker: 'demo_worker004',
    deadline: '2026-11-02'
  },
  {
    orderId: 106,
    orderNumber: 'BATCH-2026-006',
    productName: 'Hospital Medical Uniforms',
    quantity: 800,
    currentStage: 'Completed',
    status: 'Completed',
    assignedWorker: 'demo_worker003',
    deadline: '2026-10-20'
  },
  {
    orderId: 107,
    orderNumber: 'BATCH-2026-007',
    productName: 'School Uniform Sets',
    quantity: 600,
    currentStage: 'Cutting',
    status: 'Pending',
    assignedWorker: null,
    deadline: '2026-12-01'
  }
];

export const initialOrders: Order[] = [
  {
    id: 501,
    productName: 'Cotton Casual Shirt',
    quantity: 150,
    ownerUsername: 'demo_owner1',
    workerUsername: 'demo_worker001',
    status: 'IN PROGRESS',
    requestDate: '2026-10-18',
    expectedDeliveryDate: '2026-11-10',
    remarks: 'Bio-washed fabric requested'
  },
  {
    id: 502,
    productName: 'Formal Pant Navy',
    quantity: 80,
    ownerUsername: 'demo_owner1',
    workerUsername: 'demo_worker002',
    status: 'Completed',
    requestDate: '2026-10-05',
    expectedDeliveryDate: '2026-10-22',
    remarks: 'Double seam stitching verified'
  },
  {
    id: 503,
    productName: 'Cotton Kurti Festive',
    quantity: 200,
    ownerUsername: 'demo_owner1',
    workerUsername: 'demo_worker001',
    status: 'PENDING',
    requestDate: '2026-10-24',
    expectedDeliveryDate: null,
    remarks: 'Need prototype first'
  },
  {
    id: 504,
    productName: 'Heavy Bath Towel Set',
    quantity: 300,
    ownerUsername: 'demo_owner2',
    workerUsername: 'demo_worker003',
    status: 'Accepted',
    requestDate: '2026-10-22',
    expectedDeliveryDate: '2026-11-18',
    remarks: 'Jacquard border weave'
  },
  {
    id: 505,
    productName: 'Safety Reflective Jacket',
    quantity: 120,
    ownerUsername: 'demo_owner2',
    workerUsername: 'demo_worker004',
    status: 'Completed',
    requestDate: '2026-10-02',
    expectedDeliveryDate: '2026-10-15',
    remarks: 'High-visibility neon green fabric'
  }
];

export const initialPayments: Payment[] = [
  {
    paymentId: 301,
    orderId: 502,
    ownerUsername: 'demo_owner1',
    workerUsername: 'demo_worker002',
    amount: 14500,
    paymentDate: '2026-10-23',
    paymentStatus: 'Paid',
    remarks: 'Direct bank transfer credited'
  },
  {
    paymentId: 302,
    orderId: 505,
    ownerUsername: 'demo_owner2',
    workerUsername: 'demo_worker004',
    amount: 22800,
    paymentDate: '2026-10-16',
    paymentStatus: 'Paid',
    remarks: 'Batch payout completed'
  },
  {
    paymentId: 303,
    orderId: 501,
    ownerUsername: 'demo_owner1',
    workerUsername: 'demo_worker001',
    amount: 32000,
    paymentDate: '2026-10-25',
    paymentStatus: 'Pending',
    remarks: 'Milestone payment 50% on completion'
  },
  {
    paymentId: 304,
    orderId: 504,
    ownerUsername: 'demo_owner2',
    workerUsername: 'demo_worker003',
    amount: 45000,
    paymentDate: '2026-10-26',
    paymentStatus: 'Pending',
    remarks: 'Awaiting final QC report'
  }
];

export const initialTasks: Task[] = [
  {
    taskId: 201,
    taskName: 'Cut 500 pcs Cotton Casual Shirt (Qty 500)',
    assignedWorker: 'demo_worker001',
    department: 'Cutting',
    dueDate: '2026-11-04',
    status: 'In Progress'
  },
  {
    taskId: 202,
    taskName: 'Sew Collars and Cuffs for Formal Pant Navy (Qty 80)',
    assignedWorker: 'demo_worker002',
    department: 'Stitching',
    dueDate: '2026-10-21',
    status: 'Completed'
  },
  {
    taskId: 203,
    taskName: 'Quality Inspection for Medical Uniforms (Qty 800)',
    assignedWorker: 'demo_worker003',
    department: 'Checking',
    dueDate: '2026-10-19',
    status: 'Completed'
  },
  {
    taskId: 204,
    taskName: 'Pack Denim Jeans into master cartons (Qty 250)',
    assignedWorker: 'demo_worker004',
    department: 'Packing',
    dueDate: '2026-11-02',
    status: 'In Progress'
  },
  {
    taskId: 205,
    taskName: 'Overlock stitching on School Uniform Sets (Qty 600)',
    assignedWorker: 'demo_worker001',
    department: 'Stitching',
    dueDate: '2026-11-14',
    status: 'Pending'
  }
];

export const initialLogs: ActivityLog[] = [
  {
    logId: 1,
    action: 'SYSTEM_BOOT',
    details: 'TRIZEN Smart Textile System initialized with enterprise demo dataset',
    performedBy: 'demo_admin',
    timestamp: '2026-10-25 07:00:00'
  },
  {
    logId: 2,
    action: 'ORDER_CREATION',
    details: 'Created customer order #501 for Cotton Casual Shirt',
    performedBy: 'demo_owner1',
    timestamp: '2026-10-25 07:15:30'
  },
  {
    logId: 3,
    action: 'PROCESS_STAGE_UPDATE',
    details: 'Batch BATCH-2026-001 advanced to stage Stitching',
    performedBy: 'demo_owner1',
    timestamp: '2026-10-25 07:22:10'
  },
  {
    logId: 4,
    action: 'WORKER_ASSIGNMENT',
    details: 'Assigned demo_worker002 to Batch BATCH-2026-001',
    performedBy: 'demo_owner1',
    timestamp: '2026-10-25 07:25:00'
  },
  {
    logId: 5,
    action: 'PAYMENT_STATUS_UPDATE',
    details: 'Payment #301 marked as Paid (₹14,500)',
    performedBy: 'demo_owner1',
    timestamp: '2026-10-25 07:30:15'
  }
];

export const initialNotifications: Notification[] = [
  {
    notificationId: 1,
    recipient: 'all',
    title: 'Textile Operations Alert',
    message: 'Monthly dispatch target updated to 15,000 apparel units. Ensure all QC logs are up to date.',
    readStatus: false,
    createdAt: '2026-10-25 06:00:00'
  },
  {
    notificationId: 2,
    recipient: 'demo_worker001',
    title: 'New Cutting Task Assigned',
    message: 'You have been assigned to task Cut 500 pcs Cotton Casual Shirt due 2026-11-04.',
    readStatus: false,
    createdAt: '2026-10-25 07:16:00'
  },
  {
    notificationId: 3,
    recipient: 'demo_admin',
    title: 'New User Registration Request',
    message: 'Worker applicant Rajesh Kannan has registered and is pending approval.',
    readStatus: false,
    createdAt: '2026-10-25 07:20:00'
  }
];
