import { api } from './api';
import type { PaymentMethod, Sale } from '../types';

export interface SaleItemInput {
  productId: number;
  quantity: number;
}

export type DiscountType = 'rp' | 'persen';

export interface SaleInput {
  items: SaleItemInput[];
  paymentMethod: PaymentMethod;
  discountType?: DiscountType;
  discountValue?: number;
  customerNote?: string;
  amountPaid?: number;
}

// Halaman Penjualan butuh transaksi batal juga (ditampilkan dicoret); laporan tidak.
export function listSales() {
  return api.get<Sale[]>('/sales?include=all');
}

export function createSale(input: SaleInput) {
  return api.post<Sale>('/sales', input);
}

export function cancelSale(id: number, reason: string) {
  return api.post<Sale>(`/sales/${id}/cancel`, { reason });
}
