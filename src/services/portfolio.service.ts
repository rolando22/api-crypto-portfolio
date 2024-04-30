import { PortfolioItem, User } from '../db/entity';
import { type IPortfolioService } from '../interfaces';
import {
	type UpdatePortfolioItemDTO,
	type CreatePortfolioItemDTO,
	type PortfolioItem as PortfolioItemType,
} from '../types/portfolio';
import { type User as UserType } from '../types/user';

export class PortfolioService implements IPortfolioService {
	async getAll({ userId }: { userId: User['id'] }) {
		const user = await User.findOneBy({ id: userId });
		if (user == null) return [];
		const myPortfolio = await PortfolioItem.findBy({ user: { id: user.id } });
		return myPortfolio;
	}

	async getById({
		id,
		userId,
	}: {
		id: PortfolioItemType['id'];
		userId: UserType['id'];
	}) {
		const user = await User.findOneBy({ id: userId });
		if (user == null) return null;
		const item = await PortfolioItem.findOneBy({ id, user: { id: user.id } });
		if (item == null) return null;
		return item;
	}

	async create({
		data,
		userId,
	}: {
		data: CreatePortfolioItemDTO;
		userId: UserType['id'];
	}) {
		const user = await User.findOneBy({ id: userId });
		const newItem = new PortfolioItem();
		newItem.crypto = data.crypto;
		newItem.ticker = data.ticker;
		newItem.purchasePrice = data.purchasePrice;
		newItem.amount = data.amount;
		if (user != null) newItem.user = user;
		await newItem.save();
		return newItem;
	}

	async update({
		id,
		data,
		userId,
	}: {
		id: PortfolioItemType['id'];
		data: UpdatePortfolioItemDTO;
		userId: UserType['id'];
	}) {
		const user = await User.findOneBy({ id: userId });
		if (user == null) return null;
		const item = await PortfolioItem.findOneBy({ id, user: { id: user.id } });
		if (item == null) return null;
		const { crypto, ticker, purchasePrice, amount } = data;
		item.crypto = crypto;
		item.ticker = ticker;
		item.purchasePrice = purchasePrice;
		item.amount = amount;
		await item.save();
		return item;
	}

	async delete({
		id,
		userId,
	}: {
		id: PortfolioItemType['id'];
		userId: UserType['id'];
	}) {
		const user = await User.findOneBy({ id: userId });
		if (user == null) return null;
		const item = await PortfolioItem.findOneBy({ id, user: { id: user.id } });
		if (item == null) return null;
		const result = await PortfolioItem.delete({ id });
		return result.affected === 0 ? null : item;
	}
}
