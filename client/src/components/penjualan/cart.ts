import type { Product } from '../../types';
import type { DiscountType, SaleItemInput } from '../../services/sales';

// Satu racikan = varian (ml) + botol, ditampilkan sebagai satu item di keranjang.
export type CartLine =
  | { kind: 'racik'; id: string; variant: Product; bottle: Product; ml: number; qty: number }
  | { kind: 'produk'; id: string; product: Product; qty: number };

export const isRacik = (p: Product) => p.unit === 'ml' || p.category === 'Botol Kosong';
export const bottleCapacity = (p: Product) => parseInt(p.size, 10) || 0;

// Total pemakaian stok per produk di keranjang (ml untuk varian, pcs untuk lainnya).
export function usageOf(lines: CartLine[], skipId?: string): Map<number, number> {
  const usage = new Map<number, number>();
  const add = (id: number, n: number) => usage.set(id, (usage.get(id) ?? 0) + n);
  for (const l of lines) {
    if (l.id === skipId) continue;
    if (l.kind === 'racik') {
      add(l.variant.id, l.ml * l.qty);
      add(l.bottle.id, l.qty);
    } else {
      add(l.product.id, l.qty);
    }
  }
  return usage;
}

export function available(product: Product, lines: CartLine[], skipId?: string): number {
  return product.stock - (usageOf(lines, skipId).get(product.id) ?? 0);
}

export function linePrice(l: CartLine): number {
  return l.kind === 'racik' ? (l.ml * l.variant.price + l.bottle.price) * l.qty : l.product.price * l.qty;
}

// Batas jumlah botol untuk baris ini, memperhitungkan stok botol dan stok ml varian.
export function maxQty(l: CartLine, lines: CartLine[]): number {
  if (l.kind === 'produk') return Math.max(0, available(l.product, lines, l.id));
  const bottles = available(l.bottle, lines, l.id);
  const byMl = Math.floor(available(l.variant, lines, l.id) / l.ml);
  return Math.max(0, Math.min(bottles, byMl));
}

// Batas isi (ml) per botol: kapasitas botol dan sisa stok ml varian untuk jumlah botol saat ini.
export function maxMl(l: Extract<CartLine, { kind: 'racik' }>, lines: CartLine[]): number {
  const byStock = Math.floor(available(l.variant, lines, l.id) / l.qty);
  return Math.max(0, Math.min(bottleCapacity(l.bottle), byStock));
}

export function toSaleItems(lines: CartLine[]): SaleItemInput[] {
  return [...usageOf(lines)].map(([productId, quantity]) => ({ productId, quantity }));
}

// Harus sama dengan perhitungan di server (saleService.computeDiscount).
export function computeDiscount(subtotal: number, type: DiscountType, value: number): number {
  if (!(value > 0)) return 0;
  const raw = type === 'persen' ? Math.round((subtotal * Math.min(value, 100)) / 100) : Math.round(value);
  return Math.min(raw, subtotal);
}
