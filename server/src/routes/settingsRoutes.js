import { Router } from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Nama/alamat/telepon toko untuk struk: boleh dibaca semua user yang login.
router.get('/store', requireAuth, settingsController.store);

router.use(requireAuth, requireRole('admin'));
router.get('/', settingsController.get);
router.put('/', settingsController.update);

export default router;
