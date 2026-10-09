import { Router } from 'express';
import * as catalogController from '../controllers/catalogController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));
router.get('/', catalogController.list);
router.post('/', catalogController.create);
router.put('/:id', catalogController.update);
router.delete('/:id', catalogController.remove);

export default router;
