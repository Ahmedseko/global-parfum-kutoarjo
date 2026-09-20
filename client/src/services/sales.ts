import { api } from './api';
import type { PaymentMethod, Sale } from '../types';

export interface SaleItemInput {
  productId: number;
  quantity: number;
}

export interface SaleInput {
  items: SaleItemInput[];
  paymentMethod: PaymentMethod;
}

export function listSales() {
  return api.get<Sale[]>('/sales');
}

export function createSale(input: SaleInput) {
  return api.post<Sale>('/sales', input);
}
