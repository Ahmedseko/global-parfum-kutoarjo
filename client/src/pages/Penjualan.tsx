import { useEffect, useMemo, useState } from 'react';
import { Plus, Minus, Trash2, ShoppingCart, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../hooks/useToast';
import { listProducts } from '../services/products';
import { listSales, createSale } from '../services/sales';
import type { PaymentMethod, Product, Sale } from '../types';
import { ApiRequestError } from '../services/api';
import { formatCurrency, formatDateTime, todayIso } from '../utils/format';

interface CartLine {
  product: Product;
  quantity: number;
}

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'tunai', label: 'Tunai' },
  { value: 'qris', label: 'QRIS' },
  { value: 'transfer', label: 'Transfer' },
];

export default function Penjualan() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [payment, setPayment] = useState<PaymentMethod>('tunai');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function load() {
    listProducts().then((p) => setProducts(p.filter((prod) => prod.status === 'aktif')));
    listSales().then(setSales);
  }

  useEffect(load, []);

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  );

  const todaySales = useMemo(() => sales.filter((s) => s.date === todayIso()), [sales]);

  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  function inCartQty(productId: number) {
    return cart.find((l) => l.product.id === productId)?.quantity ?? 0;
  }

  function addToCart(product: Product) {
    setError(null);
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      const nextQty = (existing?.quantity ?? 0) + 1;
      if (nextQty > product.stock) return prev;
      if (existing) {
        return prev.map((l) => (l.product.id === product.id ? { ...l, quantity: nextQty } : l));
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function changeQty(productId: number, delta: number) {
    setError(null);
    setCart((prev) =>
      prev
        .map((l) => {
          if (l.product.id !== productId) return l;
          const nextQty = Math.min(l.product.stock, Math.max(0, l.quantity + delta));
          return { ...l, quantity: nextQty };
        })
        .filter((l) => l.quantity > 0),
    );
  }

  function removeLine(productId: number) {
    setCart((prev) => prev.filter((l) => l.product.id !== productId));
  }

  async function handleSubmit() {
    if (cart.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      await createSale({
        items: cart.map((l) => ({ productId: l.product.id, quantity: l.quantity })),
        paymentMethod: payment,
      });
      showToast('Penjualan berhasil disimpan.');
      setCart([]);
      load();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Stok tidak mencukupi.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
      <div className="xl:col-span-3 space-y-4">
        <Card className="overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
              <Input placeholder="Cari produk..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="max-h-[480px] overflow-y-auto divide-y divide-border">
            {filteredProducts.length === 0 && <EmptyState message="Produk tidak ditemukan." />}
            {filteredProducts.map((p) => {
              const qty = inCartQty(p.id);
              const outOfStock = p.stock === 0;
              return (
                <div key={p.id} className="flex items-center justify-between px-3.5 py-2.5">
                  <div className="min-w-0">
                    <div className="text-sm text-text truncate">{p.name}</div>
                    <div className="text-[11px] text-text-faint font-mono">
                      {formatCurrency(p.price)} &middot; Stok {p.stock}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={qty > 0 ? 'secondary' : 'primary'}
                    disabled={outOfStock || qty >= p.stock}
                    onClick={() => addToCart(p)}
                  >
                    <Plus size={13} />
                    {qty > 0 ? qty : 'Tambah'}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-border text-xs font-medium text-text-faint uppercase tracking-wide">
            Transaksi Hari Ini
          </div>
          {todaySales.length === 0 ? (
            <EmptyState icon={ShoppingCart} message="Belum ada transaksi hari ini." />
          ) : (
            <div className="divide-y divide-border max-h-56 overflow-y-auto">
              {todaySales.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-3.5 py-2.5 text-sm">
                  <div>
                    <div className="text-text">{s.transactionNumber}</div>
                    <div className="text-[11px] text-text-faint">{formatDateTime(s.createdAt)}</div>
                  </div>
                  <span className="font-mono tnum text-text">{formatCurrency(s.total)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="xl:col-span-2">
        <Card className="sticky top-0 overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-border text-xs font-medium text-text-faint uppercase tracking-wide">
            Keranjang
          </div>

          {cart.length === 0 ? (
            <EmptyState icon={ShoppingCart} message="Belum ada produk dipilih." />
          ) : (
            <div className="divide-y divide-border">
              {cart.map((line) => (
                <div key={line.product.id} className="px-3.5 py-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-text truncate">{line.product.name}</span>
                    <button onClick={() => removeLine(line.product.id)} className="text-text-faint hover:text-danger transition p-0.5">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => changeQty(line.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded border border-border text-text-muted hover:text-text transition"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-mono tnum">{line.quantity}</span>
                      <button
                        onClick={() => changeQty(line.product.id, 1)}
                        disabled={line.quantity >= line.product.stock}
                        className="w-6 h-6 flex items-center justify-center rounded border border-border text-text-muted hover:text-text transition disabled:opacity-40"
                      >
                        <Plus size={12} />
                      </button>
                      <span className="text-[11px] text-text-faint ml-1">x {formatCurrency(line.product.price)}</span>
                    </div>
                    <span className="text-sm font-mono tnum text-text">
                      {formatCurrency(line.product.price * line.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-3.5 border-t border-border space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Total</span>
              <span className="text-lg font-semibold font-mono tnum text-text">{formatCurrency(total)}</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">Metode Pembayaran</label>
              <Select value={payment} onChange={(e) => setPayment(e.target.value as PaymentMethod)}>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </Select>
            </div>

            {error && (
              <div className="text-[13px] text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</div>
            )}

            <Button className="w-full" disabled={cart.length === 0 || saving} onClick={handleSubmit}>
              {saving ? 'Menyimpan...' : 'Simpan Penjualan'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
