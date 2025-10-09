import { Router, json } from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users/routes';


const router = Router();

router.use(json());
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;