import { type ReactNode, createContext, useContext, useState } from 'react';
import type { User } from '../types';
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from '../services/auth';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());

  const login = async (email: string, password: string, remember: boolean) => {
    const loggedInUser = await loginRequest(email, password, remember);
    setUser(loggedInUser);
  };

  const logout = () => {
    logoutRequest();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
