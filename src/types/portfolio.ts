import { type User } from './user';

export interface PortfolioItem {
	id: number;
	crypto: string;
	ticker: string;
	purchasePrice: number;
	amount: number;
	user: User;
}

export interface CreatePortfolioItemDTO
	extends Omit<PortfolioItem, 'id' | 'user'> {}
export interface UpdatePortfolioItemDTO
	extends Omit<PortfolioItem, 'id' | 'user'> {}
