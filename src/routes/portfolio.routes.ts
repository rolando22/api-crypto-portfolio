import { Router } from 'express';
import { type IPortfolioService } from '../interfaces';
import { PortfolioController } from '../controllers/portfolio.controller';
import { authentication } from '../middlewares/authentication';

export const createPortfolioRouter = ({
	portfolioService,
}: {
	portfolioService: IPortfolioService;
}) => {
	const router = Router();

	const portfolioController = new PortfolioController({ portfolioService });

	router.get('/', authentication, portfolioController.getAll);
	router.get('/:id', authentication, portfolioController.getById);
	router.post('/', authentication, portfolioController.create);
	router.put('/:id', authentication, portfolioController.update);
	router.delete('/:id', authentication, portfolioController.delete);

	return router;
};
