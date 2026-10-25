export type Role = 'ADMIN' | 'OWNER' | 'WORKER';

export interface User {
  userId: number;
  username: string;
  password?: string;
  fullName: string;
  email: string;
  role: Role;
  address?: string;
  phone?: string;
  enabled: boolean;
  approved: boolean;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
}

export interface Worker {
  workerId: number;
  workerName: string;
  skill: string;
  department: string;
  phoneNumber: string;
  availability: 'Available' | 'Busy';
}

export interface Task {
  taskId: number;
  taskName: string;
  assignedWorker: string;
  department: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface ProductionOrder {
  orderId: number;
  orderNumber: string;
  productName: string;
  quantity: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedWorker: string | null;
  currentStage: 'Cutting' | 'Stitching' | 'Dyeing' | 'Finishing' | 'Packing' | 'Completed';
  deadline: string;
}

export interface Order {
  id: number;
  productName: string;
  quantity: number;
  ownerUsername: string;
  workerUsername: string | null;
  status: 'PENDING' | 'Accepted' | 'IN PROGRESS' | 'Completed' | 'Rejected';
  requestDate: string;
  expectedDeliveryDate: string | null;
  remarks?: string;
  workerResponse?: string;
}

export interface Payment {
  paymentId: number;
  orderId: number;
  ownerUsername: string;
  workerUsername: string;
  amount: number;
  paymentDate: string;
  paymentStatus: 'Paid' | 'Pending';
  remarks?: string;
}

export interface Stock {
  id: number;
  productName: string;
  category: 'Fabric' | 'Consumable' | 'Accessory' | 'Packaging' | 'Finished Goods';
  location: string;
  quantity: number;
  workerUsername?: string | null;
}

export interface ActivityLog {
  logId: number;
  action: string;
  details: string;
  performedBy: string;
  timestamp: string;
}

export interface Notification {
  notificationId: number;
  recipient: string; // 'demo_admin', username, or 'all'
  title: string;
  message: string;
  readStatus: boolean;
  createdAt: string;
}

export interface ReportItem {
  reportId: number;
  reportTitle: string;
  reportType: string;
  description: string;
  generatedBy: string;
  generatedDate: string;
}
