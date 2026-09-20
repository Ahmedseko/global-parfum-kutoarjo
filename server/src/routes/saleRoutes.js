import { Router } from 'express';
import * as saleController from '../controllers/saleController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', saleController.list);
router.post('/', saleController.create);

export default router;
