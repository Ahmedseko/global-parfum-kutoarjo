import { api } from './api';
import type { Settings, StoreInfo } from '../types';

export function getSettings() {
  return api.get<Settings>('/settings');
}

export function getStoreInfo() {
  return api.get<StoreInfo>('/settings/store');
}

export function updateSettings(input: Settings) {
  return api.put<Settings>('/settings', input);
}
