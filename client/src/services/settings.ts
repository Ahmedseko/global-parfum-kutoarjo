import { api } from './api';
import type { Settings } from '../types';

export function getSettings() {
  return api.get<Settings>('/settings');
}

export function updateSettings(input: Settings) {
  return api.put<Settings>('/settings', input);
}
