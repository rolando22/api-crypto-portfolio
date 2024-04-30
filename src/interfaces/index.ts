import { type Response, type Request, type NextFunction } from 'express';
import {
	type CreatePortfolioItemDTO,
	type PortfolioItem,
	type UpdatePortfolioItemDTO,
} from '../types/portfolio';
import { type CreateUserDTO, type User } from '../types/user';
import { type Login } from '../types/auth';

export interface IPortfolioService {
	getAll: ({ userId }: { userId: User['id'] }) => Promise<PortfolioItem[]>;
	getById: ({
		id,
		userId,
	}: {
		id: PortfolioItem['id'];
		userId: User['id'];
	}) => Promise<PortfolioItem | null>;
	create: ({
		data,
		userId,
	}: {
		data: CreatePortfolioItemDTO;
		userId: User['id'];
	}) => Promise<PortfolioItem>;
	update: ({
		id,
		data,
		userId,
	}: {
		id: PortfolioItem['id'];
		data: UpdatePortfolioItemDTO;
		userId: User['id'];
	}) => Promise<PortfolioItem | null>;
	delete: ({
		id,
		userId,
	}: {
		id: PortfolioItem['id'];
		userId: User['id'];
	}) => Promise<PortfolioItem | null>;
}

export interface IAuthService {
	login: ({ email, password }: Login) => Promise<string | null>;
	register: ({
		firstName,
		lastName,
		email,
		password,
	}: CreateUserDTO) => Promise<User>;
	getProfile: ({ userId }: { userId: User['id'] }) => Promise<User | null>;
}

export interface IController {
	getAll: (req: Request, res: Response) => Promise<void>;
	getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IAuthController {
	login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getProfile: (
		req: Request,
		res: Response,
		next: NextFunction,
	) => Promise<void>;
}
