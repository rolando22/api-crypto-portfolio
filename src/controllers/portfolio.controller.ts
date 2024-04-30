import { type Response, type Request, type NextFunction } from 'express';
import { type IController, type IPortfolioService } from '../interfaces';

export class PortfolioController implements IController {
	readonly #portfolioService;

	constructor({ portfolioService }: { portfolioService: IPortfolioService }) {
		this.#portfolioService = portfolioService;
	}

	getAll = async (req: Request, res: Response) => {
		const { userId } = req;
		const items = await this.#portfolioService.getAll({ userId });
		res.status(200).json({
			data: items,
		});
	};

	getById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req;
			const { id } = req.params;
			const item = await this.#portfolioService.getById({
				id: parseInt(id),
				userId,
			});
			if (item == null) {
				res.status(404).json({ message: 'Item or User not found' });
				return;
			}
			res.status(200).json({
				data: item,
			});
		} catch (error) {
			next(error);
		}
	};

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req;
			const { crypto, ticker, purchasePrice, amount } = req.body;
			const newItem = await this.#portfolioService.create({
				data: { crypto, ticker, purchasePrice, amount },
				userId,
			});
			res.status(201).json({
				message: 'Item created',
				data: newItem,
			});
		} catch (error) {
			next(error);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req;
			const { id } = req.params;
			const { crypto, ticker, purchasePrice, amount } = req.body;
			const updateItem = await this.#portfolioService.update({
				id: parseInt(id),
				data: { crypto, ticker, purchasePrice, amount },
				userId,
			});
			if (updateItem == null) {
				res.status(404).json({ message: 'Item or User not found' });
				return;
			}
			res.status(200).json({
				message: 'Item updated',
				data: updateItem,
			});
		} catch (error) {
			next(error);
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req;
			const { id } = req.params;
			const deleteItem = await this.#portfolioService.delete({
				id: parseInt(id),
				userId,
			});
			if (deleteItem == null) {
				res.status(404).json({ message: 'Item or User not found' });
				return;
			}
			res.status(200).json({
				message: 'Item deleted',
				data: deleteItem,
			});
		} catch (error) {
			next(error);
		}
	};
}
