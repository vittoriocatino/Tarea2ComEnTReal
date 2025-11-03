import { Router } from 'express';
import { getUsers, uploadPic } from './controller';
import { authMiddleware } from '../middlewares/auth';
import {upload} from './../middlewares/upload'

const router = Router();


/**
 * @swagger
 * /users:
 *  get:
 *    tags: [Users]
 *    descripcion: listar usuarios
 *    parameters:
 *      - in: query
 *        name: token
 *        description: auth user token
 *        shcema: 
 *         type: string
 *    responses:
 *     200:
 *      description: success
 *     401:
 *      description: missing token
 */
router.get('', authMiddleware, getUsers)

router.post('/profile', upload.single('imagen') ,uploadPic);

export default router;