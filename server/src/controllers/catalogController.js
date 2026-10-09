import * as catalogService from '../services/catalogService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  res.json(await catalogService.listCatalog());
});

export const create = asyncHandler(async (req, res) => {
  res.status(201).json(await catalogService.createCatalogItem(req.body));
});

export const update = asyncHandler(async (req, res) => {
  res.json(await catalogService.updateCatalogItem(Number(req.params.id), req.body));
});

export const remove = asyncHandler(async (req, res) => {
  res.json(await catalogService.deleteCatalogItem(Number(req.params.id)));
});
