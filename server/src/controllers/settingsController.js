import * as settingsService from '../services/settingsService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const get = asyncHandler(async (req, res) => {
  res.json(await settingsService.getSettings());
});

export const update = asyncHandler(async (req, res) => {
  res.json(await settingsService.updateSettings(req.body));
});
