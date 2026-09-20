import { Router } from 'express';
import * as closingController from '../controllers/closingController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/today', closingController.today);
router.post('/', closingController.close);

export default router;
