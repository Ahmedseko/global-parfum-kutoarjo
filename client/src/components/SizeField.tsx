import { useId } from 'react';
import { Input, Select } from './ui/Input';
import { BOTTLE_SIZES } from '../utils/productOptions';

// Botol Kosong: ukuran dibatasi kelipatan 5 ml (5-100) agar kapasitas botol selalu terbaca benar.
// Kategori lain: ketik bebas, BOTTLE_SIZES hanya jadi saran.
export function SizeField({
  category,
  value,
  onChange,
}: {
  category: string;
  value: string;
  onChange: (size: string) => void;
}) {
  const listId = useId();

  if (category === 'Botol Kosong') {
    return (
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {!BOTTLE_SIZES.includes(value) && <option value={value}>{value || 'Pilih ukuran'}</option>}
        {BOTTLE_SIZES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>
    );
  }

  return (
    <>
      <Input list={listId} value={value} onChange={(e) => onChange(e.target.value)} placeholder="mis. curah / 50 ml" />
      <datalist id={listId}>
        {BOTTLE_SIZES.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>
    </>
  );
}
