import { api, clearToken, setToken } from './api';
import type { User } from '../types';

interface LoginResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string, remember: boolean) {
  const res = await api.post<LoginResponse>('/auth/login', { email, password });
  setToken(res.token, remember);
  localStorage.setItem('gpk_user', JSON.stringify(res.user));
  return res.user;
}

export function logout() {
  clearToken();
  localStorage.removeItem('gpk_user');
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem('gpk_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}
