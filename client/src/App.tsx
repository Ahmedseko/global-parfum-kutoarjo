import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './layouts/AppLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Produk from './pages/Produk';
import Stok from './pages/Stok';
import Penjualan from './pages/Penjualan';
import ClosingHarian from './pages/ClosingHarian';
import Laporan from './pages/Laporan';
import Pengaturan from './pages/Pengaturan';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/stok" element={<Stok />} />
            <Route path="/penjualan" element={<Penjualan />} />
            <Route path="/closing" element={<ClosingHarian />} />
            <Route
              path="/laporan"
              element={
                <ProtectedRoute adminOnly>
                  <Laporan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengaturan"
              element={
                <ProtectedRoute adminOnly>
                  <Pengaturan />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
