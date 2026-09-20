import { authenticate } from '../services/authService.js';
import { signToken } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError('Email dan kata sandi wajib diisi.', 400);
  }

  const user = await authenticate(email, password);
  const token = signToken(user);

  res.json({ token, user });
});
