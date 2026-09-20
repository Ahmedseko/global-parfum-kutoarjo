import * as closingService from '../services/closingService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const today = asyncHandler(async (req, res) => {
  res.json(await closingService.getTodayClosing());
});

export const close = asyncHandler(async (req, res) => {
  const closing = await closingService.closeDay({ ...req.body, userId: req.user.id });
  res.status(201).json(closing);
});
