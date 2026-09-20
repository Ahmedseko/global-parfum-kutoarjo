import { Router } from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));
router.get('/', settingsController.get);
router.put('/', settingsController.update);

export default router;
