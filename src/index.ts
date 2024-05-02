import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createPortfolioRouter } from './routes/portfolio.routes';
import { type IAuthService, type IPortfolioService } from './interfaces';
import { handlerError } from './middlewares/handlerError';
import { createAuthRouter } from './routes/auth.routes';

export function createApp({
	authService,
	portfolioService,
}: {
	authService: IAuthService;
	portfolioService: IPortfolioService;
}) {
	const app = express();

	app.use(express.json());
	app.use(cors());

	app.use('/api/v1/auth', createAuthRouter({ authService }));
	app.use('/api/v1/portfolio', createPortfolioRouter({ portfolioService }));

	app.use(handlerError);

	app.listen(3004, () => {
		console.log(`Server listening at: http://localhost:3004`);
	});
}
