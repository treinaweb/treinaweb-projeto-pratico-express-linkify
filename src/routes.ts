import { Router, Request, Response } from 'express';
import { AuthController } from './controllers/auth.controller';
import { LinkController } from './controllers/link.controller';
import { authMiddleware } from './middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();
const linkController = new LinkController();

router.post('/api/auth/register', (req: Request, res: Response) => { authController.register(req, res)});
router.post('/api/auth/login', (req: Request, res: Response) => { authController.login(req, res)});
router.post('/api/auth/logout', (req: Request, res: Response) => { authController.logout(req, res)});


router.post('/api/link', authMiddleware, (req: Request, res: Response) => { linkController.create(req, res)});
router.get('/api/link', authMiddleware, (req: Request, res: Response) => { linkController.getLinks(req, res)});
router.delete('/api/link/:id', authMiddleware, (req: Request, res: Response) => { linkController.delete(req, res)});

router.get('/:shortCode', (req: Request, res: Response) => { linkController.redirect(req, res)});


router.get('/', (req: Request, res: Response) => {
	res.json({ message: "Hello World"});
});

export default router;
