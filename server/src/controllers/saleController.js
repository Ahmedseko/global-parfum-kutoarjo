import * as saleService from '../services/saleService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  res.json(await saleService.listSales({ includeCancelled: req.query.include === 'all' }));
});

export const create = asyncHandler(async (req, res) => {
  const sale = await saleService.createSale({ ...req.body, userId: req.user.id });
  res.status(201).json(sale);
});

export const cancel = asyncHandler(async (req, res) => {
  res.json(await saleService.cancelSale({ id: Number(req.params.id), reason: req.body.reason, userId: req.user.id }));
});
