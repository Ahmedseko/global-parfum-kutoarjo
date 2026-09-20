import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));
router.get('/', userController.list);
router.post('/', userController.create);
router.put('/:id', userController.update);

export default router;
