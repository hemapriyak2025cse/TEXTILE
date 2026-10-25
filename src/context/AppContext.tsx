import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Worker, Task, ProductionOrder, Order, Payment, Stock, ActivityLog, Notification } from '../types';
import {
  initialUsers,
  initialWorkers,
  initialTasks,
  initialProductionOrders,
  initialOrders,
  initialPayments,
  initialStocks,
  initialLogs,
  initialNotifications
} from '../data/seedData';
import { translations, Language } from '../utils/i18n';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  workers: Worker[];
  tasks: Task[];
  productionOrders: ProductionOrder[];
  orders: Order[];
  payments: Payment[];
  stocks: Stock[];
  logs: ActivityLog[];
  notifications: Notification[];
  language: Language;
  darkMode: boolean;
  setLanguage: (lang: Language) => void;
  toggleDarkMode: () => void;
  login: (username: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  register: (user: Partial<User>) => { success: boolean; message: string };
  switchUser: (username: string) => void;
  approveUser: (userId: number) => void;
  rejectUser: (userId: number) => void;
  addWorker: (worker: Omit<Worker, 'workerId'>) => void;
  deleteWorker: (workerId: number) => void;
  createOrder: (data: { productName: string; quantity: number; remarks?: string; expectedDeliveryDate?: string }) => void;
  assignWorkerToOrder: (orderId: number, workerUsername: string) => void;
  workerAcceptOrder: (orderId: number) => void;
  workerRejectOrder: (orderId: number) => void;
  workerUpdateOrderDate: (orderId: number, date: string) => void;
  workerCompleteOrder: (orderId: number) => void;
  createProductionBatch: (batch: Partial<ProductionOrder>) => void;
  updateProductionStage: (orderId: number, stage: ProductionOrder['currentStage']) => void;
  assignWorkerToBatch: (orderId: number, workerUsername: string) => void;
  updateProductionStatus: (orderId: number, status: ProductionOrder['status']) => void;
  createPayment: (orderId: number, workerUsername: string, amount: number, remarks?: string) => void;
  updatePaymentStatus: (paymentId: number, status: 'Paid' | 'Pending') => void;
  createTask: (task: Omit<Task, 'taskId'>) => void;
  updateTaskStatus: (taskId: number, status: Task['status']) => void;
  deleteTask: (taskId: number) => void;
  markNotificationRead: (id: number) => void;
  markAllNotificationsRead: (recipient?: string) => void;
  logActivity: (action: string, details: string) => void;
  resetToDefaultData: () => void;
  t: (key: string, fallback?: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem('trizen_' + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem('trizen_' + key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => getStorage('users', initialUsers));
  const [workers, setWorkers] = useState<Worker[]>(() => getStorage('workers', initialWorkers));
  const [tasks, setTasks] = useState<Task[]>(() => getStorage('tasks', initialTasks));
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>(() => getStorage('productionOrders', initialProductionOrders));
  const [orders, setOrders] = useState<Order[]>(() => getStorage('orders', initialOrders));
  const [payments, setPayments] = useState<Payment[]>(() => getStorage('payments', initialPayments));
  const [stocks, setStocks] = useState<Stock[]>(() => getStorage('stocks', initialStocks));
  const [logs, setLogs] = useState<ActivityLog[]>(() => getStorage('logs', initialLogs));
  const [notifications, setNotifications] = useState<Notification[]>(() => getStorage('notifications', initialNotifications));
  
  // Default to demo_owner1 for instant rich experience
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = getStorage<string | null>('active_username', 'demo_owner1');
    const found = users.find(u => u.username === saved);
    return found || users[1] || users[0];
  });

  const [language, setLanguageState] = useState<Language>(() => getStorage<Language>('language', 'en'));
  const [darkMode, setDarkMode] = useState<boolean>(() => getStorage<boolean>('darkMode', false));

  useEffect(() => { setStorage('users', users); }, [users]);
  useEffect(() => { setStorage('workers', workers); }, [workers]);
  useEffect(() => { setStorage('tasks', tasks); }, [tasks]);
  useEffect(() => { setStorage('productionOrders', productionOrders); }, [productionOrders]);
  useEffect(() => { setStorage('orders', orders); }, [orders]);
  useEffect(() => { setStorage('payments', payments); }, [payments]);
  useEffect(() => { setStorage('stocks', stocks); }, [stocks]);
  useEffect(() => { setStorage('logs', logs); }, [logs]);
  useEffect(() => { setStorage('notifications', notifications); }, [notifications]);
  useEffect(() => { setStorage('active_username', currentUser?.username || null); }, [currentUser]);
  useEffect(() => { setStorage('language', language); }, [language]);
  useEffect(() => {
    setStorage('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language];
    return dict?.[key] || fallback || key;
  };

  const logActivity = (action: string, details: string) => {
    const newLog: ActivityLog = {
      logId: Date.now(),
      action,
      details,
      performedBy: currentUser ? currentUser.username : 'system',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const login = (username: string, pass: string): { success: boolean; message?: string } => {
    const user = users.find(u => u.username === username || u.email === username);
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }
    if (pass !== 'Demo@123' && user.password && user.password !== pass) {
      return { success: false, message: 'Invalid username or password' };
    }
    if (!user.approved) {
      return { success: false, message: 'Account is pending administrative approval.' };
    }
    if (!user.enabled) {
      return { success: false, message: 'Account has been disabled.' };
    }
    setCurrentUser(user);
    logActivity('LOGIN', `User ${user.username} logged in successfully`);
    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      logActivity('LOGOUT', `User ${currentUser.username} logged out`);
    }
    setCurrentUser(null);
  };

  const register = (data: Partial<User>): { success: boolean; message: string } => {
    if (!data.username || !data.email || !data.fullName) {
      return { success: false, message: 'Please fill in all required fields.' };
    }
    if (users.some(u => u.username === data.username)) {
      return { success: false, message: 'Username is already taken.' };
    }
    const newUser: User = {
      userId: Date.now(),
      username: data.username,
      password: data.password || 'Demo@123',
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || '+91 90000 00000',
      address: data.address || '',
      role: data.role || 'WORKER',
      enabled: true,
      approved: false // requires admin approval
    };
    setUsers(prev => [...prev, newUser]);
    
    // Add admin notification
    const newNotif: Notification = {
      notificationId: Date.now(),
      recipient: 'demo_admin',
      title: 'New User Registration',
      message: `User ${newUser.fullName} (${newUser.username}) registered as ${newUser.role} and is awaiting approval.`,
      readStatus: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setNotifications(prev => [newNotif, ...prev]);
    logActivity('USER_REGISTERED', `New registration submitted for ${newUser.username}`);

    return {
      success: true,
      message: 'Registration submitted successfully! Please wait for Administrator approval before logging in.'
    };
  };

  const switchUser = (username: string) => {
    const user = users.find(u => u.username === username);
    if (user) {
      setCurrentUser(user);
      logActivity('USER_SWITCH', `Switched active account to ${user.username}`);
    }
  };

  const approveUser = (userId: number) => {
    setUsers(prev => prev.map(u => u.userId === userId ? { ...u, approved: true } : u));
    const target = users.find(u => u.userId === userId);
    if (target) {
      logActivity('USER_APPROVED', `Admin approved user ${target.username}`);
      const notif: Notification = {
        notificationId: Date.now(),
        recipient: target.username,
        title: 'Account Approved',
        message: 'Your TRIZEN account has been verified and approved by the Administrator. You can now use all features.',
        readStatus: false,
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const rejectUser = (userId: number) => {
    const target = users.find(u => u.userId === userId);
    setUsers(prev => prev.filter(u => u.userId !== userId));
    if (target) {
      logActivity('USER_REJECTED', `Admin rejected and removed user ${target.username}`);
    }
  };

  const addWorker = (data: Omit<Worker, 'workerId'>) => {
    const newWorker: Worker = {
      ...data,
      workerId: Date.now()
    };
    setWorkers(prev => [...prev, newWorker]);
    logActivity('WORKER_CREATED', `Worker ${newWorker.workerName} added to ${newWorker.department} department`);
  };

  const deleteWorker = (workerId: number) => {
    const target = workers.find(w => w.workerId === workerId);
    setWorkers(prev => prev.filter(w => w.workerId !== workerId));
    if (target) {
      logActivity('WORKER_DELETED', `Worker ${target.workerName} deleted`);
    }
  };

  const createOrder = (data: { productName: string; quantity: number; remarks?: string; expectedDeliveryDate?: string }) => {
    const newOrder: Order = {
      id: Date.now(),
      productName: data.productName,
      quantity: data.quantity,
      ownerUsername: currentUser?.username || 'demo_owner1',
      workerUsername: null,
      status: 'PENDING',
      requestDate: new Date().toISOString().slice(0, 10),
      expectedDeliveryDate: data.expectedDeliveryDate || null,
      remarks: data.remarks || ''
    };
    setOrders(prev => [newOrder, ...prev]);
    logActivity('ORDER_CREATION', `Order #${newOrder.id} created for ${newOrder.productName} (Qty: ${newOrder.quantity})`);
  };

  const assignWorkerToOrder = (orderId: number, workerUsername: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, workerUsername } : o));
    logActivity('ORDER_ASSIGNMENT', `Assigned worker ${workerUsername} to order #${orderId}`);
    const notif: Notification = {
      notificationId: Date.now(),
      recipient: workerUsername,
      title: 'New Customer Order Assigned',
      message: `You were assigned customer order #${orderId}. Please review and accept/update delivery date.`,
      readStatus: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const workerAcceptOrder = (orderId: number) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Accepted' } : o));
    logActivity('ORDER_ACCEPT', `Worker ${currentUser?.username} accepted order #${orderId}`);
  };

  const workerRejectOrder = (orderId: number) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Rejected' } : o));
    logActivity('ORDER_REJECT', `Worker ${currentUser?.username} rejected order #${orderId}`);
  };

  const workerUpdateOrderDate = (orderId: number, date: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, expectedDeliveryDate: date, status: 'IN PROGRESS' } : o));
    logActivity('ORDER_UPDATE_DATE', `Worker ${currentUser?.username} set delivery date ${date} for order #${orderId}`);
  };

  const workerCompleteOrder = (orderId: number) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Completed' } : o));
    logActivity('ORDER_COMPLETE', `Worker ${currentUser?.username} completed order #${orderId}`);
  };

  const createProductionBatch = (batch: Partial<ProductionOrder>) => {
    const newBatch: ProductionOrder = {
      orderId: Date.now(),
      orderNumber: batch.orderNumber || 'BATCH-' + Date.now().toString().slice(-6),
      productName: batch.productName || 'Cotton Fabric Item',
      quantity: batch.quantity || 100,
      currentStage: batch.currentStage || 'Cutting',
      status: batch.status || 'Pending',
      assignedWorker: batch.assignedWorker || null,
      deadline: batch.deadline || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10)
    };
    setProductionOrders(prev => [newBatch, ...prev]);
    logActivity('BATCH_CREATED', `Created production batch ${newBatch.orderNumber} for ${newBatch.productName}`);
  };

  const updateProductionStage = (orderId: number, stage: ProductionOrder['currentStage']) => {
    setProductionOrders(prev => prev.map(b => {
      if (b.orderId === orderId) {
        const nextStatus = stage === 'Completed' ? 'Completed' : (b.status === 'Pending' ? 'In Progress' : b.status);
        return { ...b, currentStage: stage, status: nextStatus };
      }
      return b;
    }));
    logActivity('PROCESS_STAGE_UPDATE', `Batch #${orderId} moved to stage '${stage}'`);
  };

  const assignWorkerToBatch = (orderId: number, workerUsername: string) => {
    setProductionOrders(prev => prev.map(b => b.orderId === orderId ? { ...b, assignedWorker: workerUsername } : b));
    logActivity('WORKER_ASSIGNMENT', `Assigned ${workerUsername} to batch #${orderId}`);
    const notif: Notification = {
      notificationId: Date.now(),
      recipient: workerUsername,
      title: 'Batch Assignment',
      message: `You were assigned to batch #${orderId}.`,
      readStatus: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateProductionStatus = (orderId: number, status: ProductionOrder['status']) => {
    setProductionOrders(prev => prev.map(b => b.orderId === orderId ? { ...b, status } : b));
    logActivity('BATCH_STATUS_UPDATE', `Batch #${orderId} status set to ${status}`);
  };

  const createPayment = (orderId: number, workerUsername: string, amount: number, remarks?: string) => {
    const newPayment: Payment = {
      paymentId: Date.now(),
      orderId,
      ownerUsername: currentUser?.username || 'demo_owner1',
      workerUsername,
      amount,
      paymentDate: new Date().toISOString().slice(0, 10),
      paymentStatus: 'Pending',
      remarks: remarks || ''
    };
    setPayments(prev => [newPayment, ...prev]);
    logActivity('PAYMENT_CREATED', `Recorded payment of ₹${amount} for order #${orderId}`);
  };

  const updatePaymentStatus = (paymentId: number, status: 'Paid' | 'Pending') => {
    setPayments(prev => prev.map(p => p.paymentId === paymentId ? { ...p, paymentStatus: status } : p));
    logActivity('PAYMENT_STATUS_UPDATE', `Payment #${paymentId} marked as ${status}`);
  };

  const createTask = (data: Omit<Task, 'taskId'>) => {
    const newTask: Task = {
      ...data,
      taskId: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
    logActivity('TASK_ASSIGNMENT', `Created task '${newTask.taskName}' for ${newTask.assignedWorker}`);
    const notif: Notification = {
      notificationId: Date.now(),
      recipient: newTask.assignedWorker,
      title: 'New Task Assigned',
      message: `You have a new task: ${newTask.taskName}. Due date: ${newTask.dueDate}`,
      readStatus: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateTaskStatus = (taskId: number, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.taskId === taskId ? { ...t, status } : t));
    logActivity('TASK_STATUS_UPDATE', `Task #${taskId} marked as ${status}`);
  };

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(t => t.taskId !== taskId));
    logActivity('TASK_DELETED', `Task #${taskId} deleted`);
  };

  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.notificationId === id ? { ...n, readStatus: true } : n));
  };

  const markAllNotificationsRead = (recipient?: string) => {
    setNotifications(prev => prev.map(n => {
      if (!recipient || n.recipient === recipient || n.recipient === 'all') {
        return { ...n, readStatus: true };
      }
      return n;
    }));
  };

  const resetToDefaultData = () => {
    setUsers(initialUsers);
    setWorkers(initialWorkers);
    setTasks(initialTasks);
    setProductionOrders(initialProductionOrders);
    setOrders(initialOrders);
    setPayments(initialPayments);
    setStocks(initialStocks);
    setLogs(initialLogs);
    setNotifications(initialNotifications);
    setCurrentUser(initialUsers[1]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        workers,
        tasks,
        productionOrders,
        orders,
        payments,
        stocks,
        logs,
        notifications,
        language,
        darkMode,
        setLanguage,
        toggleDarkMode,
        login,
        logout,
        register,
        switchUser,
        approveUser,
        rejectUser,
        addWorker,
        deleteWorker,
        createOrder,
        assignWorkerToOrder,
        workerAcceptOrder,
        workerRejectOrder,
        workerUpdateOrderDate,
        workerCompleteOrder,
        createProductionBatch,
        updateProductionStage,
        assignWorkerToBatch,
        updateProductionStatus,
        createPayment,
        updatePaymentStatus,
        createTask,
        updateTaskStatus,
        deleteTask,
        markNotificationRead,
        markAllNotificationsRead,
        logActivity,
        resetToDefaultData,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
