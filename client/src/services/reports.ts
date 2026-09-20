import { api, getToken } from './api';
import type { DashboardSummary, ReportSummary } from '../types';

export function getDashboardSummary() {
  return api.get<DashboardSummary>('/reports/summary');
}

export type ReportRangePreset = 'today' | 'week' | 'month' | 'custom';

export function getSalesReport(params: { from: string; to: string }) {
  const q = new URLSearchParams(params).toString();
  return api.get<ReportSummary>(`/reports/sales?${q}`);
}

export async function exportSalesExcel(params: { from: string; to: string }) {
  const q = new URLSearchParams(params).toString();
  const token = getToken();
  const res = await fetch(`/api/reports/export?${q}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? 'Gagal mengekspor laporan.');
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `laporan-penjualan-${params.from}-${params.to}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
