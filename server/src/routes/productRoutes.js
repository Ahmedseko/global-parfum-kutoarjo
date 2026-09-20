import { Router } from 'express';
import * as productController from '../controllers/productController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', productController.list);
router.post('/', requireRole('admin'), productController.create);
router.put('/:id', requireRole('admin'), productController.update);
router.delete('/:id', requireRole('admin'), productController.remove);

export default router;
