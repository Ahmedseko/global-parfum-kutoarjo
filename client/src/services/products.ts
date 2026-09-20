import { api } from './api';
import type { Product } from '../types';

export interface ProductInput {
  name: string;
  category: string;
  size: string;
  price: number;
  lowStockThreshold: number;
}

export function listProducts() {
  return api.get<Product[]>('/products');
}

export function createProduct(input: ProductInput) {
  return api.post<Product>('/products', input);
}

export function updateProduct(id: number, input: Partial<ProductInput> & { status?: Product['status'] }) {
  return api.put<Product>(`/products/${id}`, input);
}
