import type { ProductUnit } from '../types';

export const CATEGORIES = ['Parfum Refill', 'Botol Kosong', 'Parfum Botol', 'Bibit Parfum', 'Produk Pendukung'];
export const SIZES = ['10 ml', '20 ml', '25 ml', '30 ml', '50 ml', '100 ml']; // saran saja, ukuran bebas diketik admin
export const UNITS: { value: ProductUnit; label: string }[] = [
  { value: 'botol', label: 'Botol / pcs' },
  { value: 'ml', label: 'ml (varian parfum curah)' },
];

// Pilihan kategori otomatis menyetel satuan: refill = ml, botol kosong = pcs.
export const CATEGORY_DEFAULTS: Record<string, { unit: ProductUnit; size: string }> = {
  'Parfum Refill': { unit: 'ml', size: 'curah' },
  'Botol Kosong': { unit: 'botol', size: '30 ml' },
};
