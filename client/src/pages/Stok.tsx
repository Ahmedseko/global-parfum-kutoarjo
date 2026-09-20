import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, History } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select, FormField, Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../hooks/useToast';
import { listProducts } from '../services/products';
import { listStockMovements, addStock } from '../services/stock';
import type { Product, StockMovement, StockMovementType } from '../types';
import { formatDate, todayIso } from '../utils/format';

const typeTone: Record<StockMovementType, { label: string; tone: 'success' | 'accent' | 'warning' }> = {
  masuk: { label: 'Stok Masuk', tone: 'success' },
  penjualan: { label: 'Penjualan', tone: 'accent' },
  penyesuaian: { label: 'Penyesuaian', tone: 'warning' },
};

export default function Stok() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(todayIso());
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  function load() {
    setLoading(true);
    Promise.all([listProducts(), listStockMovements()])
      .then(([p, m]) => {
        setProducts(p);
        setMovements(m);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  useEffect(() => {
    if (searchParams.get('new')) {
      openModal();
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const activeProducts = useMemo(() => products.filter((p) => p.status === 'aktif'), [products]);
  const selectedProduct = products.find((p) => p.id === productId) ?? null;

  function openModal() {
    setProductId(activeProducts[0]?.id ?? null);
    setQuantity(0);
    setDate(todayIso());
    setNote('');
    setModalOpen(true);
  }

  async function handleSubmit() {
    if (!productId || quantity <= 0) return;
    setSaving(true);
    try {
      await addStock({ productId, quantity, date, note: note.trim() || undefined });
      showToast('Stok berhasil diperbarui.');
      setModalOpen(false);
      load();
    } catch {
      showToast('Gagal menambah stok.', 'error');
    } finally {
      setSaving(false);
    }
  }

  const isValid = productId !== null && quantity > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">Pantau stok saat ini dan riwayat pergerakan stok.</p>
        <Button onClick={openModal}>
          <Plus size={15} />
          Tambah Stok
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-border text-xs font-medium text-text-faint uppercase tracking-wide">
          Stok Saat Ini
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg/50">
                {['Produk', 'Kategori', 'Stok', 'Batas Minimum', 'Status'].map((h) => (
                  <th key={h} className="text-left font-medium text-text-faint text-[11px] uppercase tracking-wide px-3.5 py-2.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!loading && activeProducts.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <EmptyState message="Belum ada data produk." />
                  </td>
                </tr>
              )}
              {activeProducts.map((p) => {
                const low = p.stock <= p.lowStockThreshold;
                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-3.5 py-2.5 text-text">{p.name}</td>
                    <td className="px-3.5 py-2.5 text-text-muted">{p.category}</td>
                    <td className="px-3.5 py-2.5 font-mono tnum text-text">{p.stock}</td>
                    <td className="px-3.5 py-2.5 font-mono tnum text-text-muted">{p.lowStockThreshold}</td>
                    <td className="px-3.5 py-2.5">
                      {low ? <Badge tone="warning">Menipis</Badge> : <Badge tone="success">Aman</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-border text-xs font-medium text-text-faint uppercase tracking-wide">
          Riwayat Stok
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg/50">
                {['Tanggal', 'Produk', 'Jenis', 'Jumlah', 'Stok Sebelum', 'Stok Sesudah', 'Catatan'].map((h) => (
                  <th key={h} className="text-left font-medium text-text-faint text-[11px] uppercase tracking-wide px-3.5 py-2.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!loading && movements.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <EmptyState icon={History} message="Belum ada riwayat stok." />
                  </td>
                </tr>
              )}
              {movements.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-3.5 py-2.5 text-text-muted">{formatDate(m.createdAt)}</td>
                  <td className="px-3.5 py-2.5 text-text">{m.productName}</td>
                  <td className="px-3.5 py-2.5">
                    <Badge tone={typeTone[m.type].tone}>{typeTone[m.type].label}</Badge>
                  </td>
                  <td className={'px-3.5 py-2.5 font-mono tnum ' + (m.quantity < 0 ? 'text-danger' : 'text-success')}>
                    {m.quantity > 0 ? '+' : ''}
                    {m.quantity}
                  </td>
                  <td className="px-3.5 py-2.5 font-mono tnum text-text-muted">{m.stockBefore}</td>
                  <td className="px-3.5 py-2.5 font-mono tnum text-text">{m.stockAfter}</td>
                  <td className="px-3.5 py-2.5 text-text-faint">{m.note ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Tambah Stok"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={!isValid || saving}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </>
        }
      >
        <div className="space-y-3.5">
          <FormField label="Tanggal">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormField>
          <FormField label="Produk">
            <Select value={productId ?? ''} onChange={(e) => setProductId(Number(e.target.value))}>
              {activeProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Jumlah Stok Tambahan">
            <Input
              type="number"
              min={1}
              value={quantity || ''}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </FormField>

          {selectedProduct && (
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-bg border border-border p-3 text-center">
              <div>
                <div className="text-[11px] text-text-faint mb-0.5">Stok Sebelumnya</div>
                <div className="font-mono tnum text-text">{selectedProduct.stock}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-faint mb-0.5">Stok Tambahan</div>
                <div className="font-mono tnum text-success">+{quantity || 0}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-faint mb-0.5">Stok Setelah</div>
                <div className="font-mono tnum text-text font-semibold">{selectedProduct.stock + (quantity || 0)}</div>
              </div>
            </div>
          )}

          <FormField label="Catatan (opsional)">
            <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Contoh: Kiriman bibit parfum baru" />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}
