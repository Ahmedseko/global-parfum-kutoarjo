import * as userService from '../services/userService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  res.json(await userService.listUsers());
});

export const create = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

export const update = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(Number(req.params.id), req.body, req.user.id);
  res.json(user);
});
