import { Router } from 'express';
import { type IAuthService } from '../interfaces';
import { authentication } from '../middlewares/authentication';
import { AuthController } from '../controllers/auth.controller';

export const createAuthRouter = ({
	authService,
}: {
	authService: IAuthService;
}) => {
	const router = Router();

	const authController = new AuthController({ authService });

	router.post('/login', authController.login);
	router.post('/register', authController.register);
	router.get('/profile', authentication, authController.getProfile);

	return router;
};
