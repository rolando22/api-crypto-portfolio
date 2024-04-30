import { type IAuthController, type IAuthService } from '../interfaces';
import { type NextFunction, type Request, type Response } from 'express';

export class AuthController implements IAuthController {
	readonly #authService;
	constructor({ authService }: { authService: IAuthService }) {
		this.#authService = authService;
	}

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;
			const token = await this.#authService.login({
				email,
				password,
			});
			if (token == null) {
				res.status(401).json({ error: 'invalid user or password' });
				return;
			}
			res.json({
				data: { token },
			});
		} catch (error) {
			next(error);
		}
	};

	register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { firstName, lastName, email, password } = req.body;
			const user = await this.#authService.register({
				firstName,
				lastName,
				email,
				password,
			});
			res.status(201).json({
				message: 'User registered',
				data: user,
			});
		} catch (error) {
			next(error);
		}
	};

	getProfile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req;
			const user = await this.#authService.getProfile({ userId });
			if (user == null) {
				res.status(404).json({ message: 'Profile not found' });
				return;
			}
			res.status(200).json({
				data: user,
			});
		} catch (error) {
			next(error);
		}
	};
}
