import { Router } from 'express';
import * as reportController from '../controllers/reportController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/summary', reportController.summary);
router.get('/sales', requireRole('admin'), reportController.sales);
router.get('/export', requireRole('admin'), reportController.exportExcel);

export default router;
