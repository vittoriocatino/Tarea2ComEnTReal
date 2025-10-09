import { Router } from 'express';
import { getUsers } from './controller';
import { authMiddleware } from '../middlewares/auth';


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

export default router;