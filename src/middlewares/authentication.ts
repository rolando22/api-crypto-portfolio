import jwt from 'jsonwebtoken';
import { config } from '../config';
import { type Request, type NextFunction, type Response } from 'express';
import { type CustomJwtPayload } from '../types/server';

const { jwtSecret } = config;

export const authentication = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authorization = req.get('authorization');
	let token = '';
	if (
		authorization != null &&
		authorization.toLowerCase().startsWith('bearer')
	) {
		token = authorization.split(' ')[1];
	}
	const decodedToken = jwt.verify(token, jwtSecret) as CustomJwtPayload;

	const { id } = decodedToken;
	req.userId = id;
	next();
};
