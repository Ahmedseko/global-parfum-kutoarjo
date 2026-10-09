import { Router } from 'express';
import * as saleController from '../controllers/saleController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', saleController.list);
router.post('/', saleController.create);
router.post('/:id/cancel', requireRole('admin'), saleController.cancel);

export default router;
