import { Router } from 'express';
import { showLogin, showRooms, showChat } from './controller';

const router = Router();

router.get('/', showLogin);
router.get('/rooms', showRooms);
router.get('/chat/:roomId', showChat);

export default router;
