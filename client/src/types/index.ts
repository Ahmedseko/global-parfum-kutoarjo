export type Role = 'admin' | 'staff';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export type ProductStatus = 'aktif' | 'nonaktif';

export interface Product {
  id: number;
  name: string;
  category: string;
  size: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export type StockMovementType = 'masuk' | 'penjualan' | 'penyesuaian';

export interface StockMovement {
  id: number;
  productId: number;
  productName: string;
  type: StockMovementType;
  quantity: number;
  stockBefore: number;
  stockAfter: number;
  note: string | null;
  userName: string;
  createdAt: string;
}

export type PaymentMethod = 'tunai' | 'qris' | 'transfer';

export interface SaleItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: number;
  transactionNumber: string;
  date: string;
  items: SaleItem[];
  total: number;
  paymentMethod: PaymentMethod;
  userName: string;
  createdAt: string;
}

export interface DailyClosingItem {
  id: number;
  productId: number;
  productName: string;
  openingStock: number;
  stockAdded: number;
  quantitySold: number;
  systemStock: number;
  actualStock: number;
  difference: number;
  note: string | null;
}

export type ClosingStatus = 'terbuka' | 'ditutup';

export interface DailyClosing {
  id: number;
  closingDate: string;
  totalTransactions: number;
  totalItemsSold: number;
  totalRevenue: number;
  status: ClosingStatus;
  note: string | null;
  closedBy: string | null;
  createdAt: string;
  items: DailyClosingItem[];
}

export interface Settings {
  storeName: string;
  ownerName: string;
  address: string;
  phone: string;
  currency: string;
  defaultLowStockThreshold: number;
}

export interface DashboardSummary {
  salesToday: number;
  revenueToday: number;
  itemsSoldToday: number;
  lowStockCount: number;
  salesTrend: { date: string; revenue: number }[];
  bestSellers: { productName: string; quantity: number }[];
  recentSales: Sale[];
  lowStockProducts: Product[];
}

export interface ReportSummary {
  totalTransactions: number;
  totalRevenue: number;
  totalItemsSold: number;
  bestSellers: { productName: string; quantity: number; revenue: number }[];
  salesTrend: { date: string; revenue: number }[];
  sales: Sale[];
}

export interface ApiError {
  message: string;
}
