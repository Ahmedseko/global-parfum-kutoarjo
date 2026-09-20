import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, PackageX } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input, Select, FormField } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { listProducts, createProduct, updateProduct, deleteProduct, type ProductInput } from '../services/products';
import type { Product } from '../types';
import { formatCurrency } from '../utils/format';

const CATEGORIES = ['Parfum Refill', 'Parfum Botol', 'Bibit Parfum', 'Produk Pendukung'];
const SIZES = ['10 ml', '30 ml', '50 ml', '100 ml'];

const emptyForm: ProductInput = {
  name: '',
  category: CATEGORIES[0],
  size: SIZES[1],
  price: 0,
  lowStockThreshold: 5,
};

export default function Produk() {
  const { showToast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    listProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  useEffect(() => {
    if (searchParams.get('new') && isAdmin) {
      openCreate();
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (categoryFilter && p.category !== categoryFilter) return false;
        if (statusFilter && p.status !== statusFilter) return false;
        return true;
      }),
    [products, search, categoryFilter, statusFilter],
  );

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setForm({
      name: product.name,
      category: product.category,
      size: product.size,
      price: product.price,
      lowStockThreshold: product.lowStockThreshold,
    });
    setModalOpen(true);
  }

  async function handleSubmit() {
    if (!form.name.trim() || form.price <= 0) return;
    setSaving(true);
    try {
      if (editing) {
        await updateProduct(editing.id, form);
        showToast('Produk berhasil diperbarui.');
      } else {
        await createProduct(form);
        showToast('Produk berhasil ditambahkan.');
      }
      setModalOpen(false);
      load();
    } catch {
      showToast('Gagal menyimpan produk.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    if (!window.confirm(`Hapus produk "${product.name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      const result = await deleteProduct(product.id);
      showToast(
        result.deleted
          ? 'Produk berhasil dihapus.'
          : 'Produk sudah punya riwayat transaksi/stok, jadi dinonaktifkan (tidak dihapus) agar data tetap konsisten.',
      );
      load();
    } catch {
      showToast('Gagal menghapus produk.', 'error');
    }
  }

  const isValid = form.name.trim().length > 0 && form.price > 0 && form.lowStockThreshold >= 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
          <Input
            placeholder="Cari produk..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-48">
          <option value="">Semua Kategori</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40">
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </Select>
        {isAdmin && (
          <Button onClick={openCreate}>
            <Plus size={15} />
            Tambah Produk
          </Button>
        )}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg/50">
                {(isAdmin
                  ? ['Nama Produk', 'Kategori', 'Ukuran', 'Harga', 'Stok', 'Status', '']
                  : ['Nama Produk', 'Kategori', 'Ukuran', 'Harga', 'Stok', 'Status']
                ).map((h) => (
                  <th key={h} className="text-left font-medium text-text-faint text-[11px] uppercase tracking-wide px-3.5 py-2.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6}>
                    <EmptyState icon={PackageX} message="Belum ada data produk." />
                  </td>
                </tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-3.5 py-2.5 text-text">{p.name}</td>
                  <td className="px-3.5 py-2.5 text-text-muted">{p.category}</td>
                  <td className="px-3.5 py-2.5 text-text-muted font-mono">{p.size}</td>
                  <td className="px-3.5 py-2.5 text-text font-mono tnum">{formatCurrency(p.price)}</td>
                  <td className="px-3.5 py-2.5 font-mono tnum">
                    <span className={p.stock <= p.lowStockThreshold ? 'text-warning' : 'text-text'}>{p.stock}</span>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <Badge tone={p.status === 'aktif' ? 'success' : 'neutral'}>
                      {p.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </td>
                  {isAdmin && (
                    <td className="px-3.5 py-2.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded text-text-muted hover:text-text hover:bg-white/[0.06] transition"
                          aria-label="Edit"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-1.5 rounded text-text-muted hover:text-danger hover:bg-danger/10 transition"
                          aria-label="Hapus"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Produk' : 'Tambah Produk'}
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
          <FormField label="Nama Produk">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Sauvage Inspired 30 ml" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Kategori">
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Ukuran">
              <Select value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Harga (Rp)">
              <Input
                type="number"
                min={0}
                value={form.price || ''}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </FormField>
            <FormField label="Batas Stok Menipis">
              <Input
                type="number"
                min={0}
                value={form.lowStockThreshold}
                onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })}
              />
            </FormField>
          </div>
        </div>
      </Modal>
    </div>
  );
}
