import { Router, Request, Response } from 'express';
import { AuthController } from './controllers/auth.controller';

const router = Router();
const authController = new AuthController()

router.post('/api/auth/register', (req: Request, res: Response) => { authController.register(req, res)});

router.get('/', (req: Request, res: Response) => {
	res.json({ message: "Hello World"});
});

export default router;
