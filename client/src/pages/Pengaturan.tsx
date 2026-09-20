import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, FormField } from '../components/ui/Input';
import { useToast } from '../hooks/useToast';
import { getSettings, updateSettings } from '../services/settings';
import type { Settings } from '../types';

const defaultSettings: Settings = {
  storeName: '',
  ownerName: '',
  address: '',
  phone: '',
  currency: 'IDR',
  defaultLowStockThreshold: 5,
};

export default function Pengaturan() {
  const { showToast } = useToast();
  const [form, setForm] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings()
      .then(setForm)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit() {
    setSaving(true);
    try {
      const updated = await updateSettings(form);
      setForm(updated);
      showToast('Pengaturan berhasil disimpan.');
    } catch {
      showToast('Gagal menyimpan pengaturan.', 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-sm text-text-muted">Memuat pengaturan...</div>;

  return (
    <div className="max-w-xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Toko</CardTitle>
        </CardHeader>
        <div className="p-4 space-y-3.5">
          <FormField label="Nama Toko">
            <Input value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
          </FormField>
          <FormField label="Nama Owner">
            <Input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} />
          </FormField>
          <FormField label="Alamat">
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Nomor Telepon">
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </FormField>
            <FormField label="Mata Uang">
              <Input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Batas Peringatan Stok Menipis">
            <Input
              type="number"
              min={0}
              value={form.defaultLowStockThreshold}
              onChange={(e) => setForm({ ...form, defaultLowStockThreshold: Number(e.target.value) })}
            />
          </FormField>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </Button>
      </div>
    </div>
  );
}
