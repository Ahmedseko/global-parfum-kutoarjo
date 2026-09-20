import { api } from './api';
import type { Role, User } from '../types';

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export function listUsers() {
  return api.get<User[]>('/users');
}

export function createUser(input: UserInput) {
  return api.post<User>('/users', input);
}

export function updateUser(id: number, input: Partial<Pick<UserInput, 'name' | 'role'>> & { isActive?: boolean }) {
  return api.put<User>(`/users/${id}`, input);
}
