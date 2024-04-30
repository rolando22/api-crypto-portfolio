import { type JwtPayload } from 'jsonwebtoken';
import { type User } from './user';

declare module 'express-serve-static-core' {
	interface Request {
		userId: User['id'];
	}
}

export interface CustomJwtPayload extends JwtPayload {
	id: number;
}
