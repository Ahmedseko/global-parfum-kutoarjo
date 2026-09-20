import { api } from './api';
import type { StockMovement } from '../types';

export interface StockAddInput {
  date: string;
  productId: number;
  quantity: number;
  note?: string;
}

export function listStockMovements() {
  return api.get<StockMovement[]>('/stock');
}

export function addStock(input: StockAddInput) {
  return api.post<StockMovement>('/stock/add', input);
}
