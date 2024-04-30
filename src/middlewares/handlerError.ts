import { type Response, type Request, type NextFunction } from 'express';

const handler: Record<string, (res: Response, error: Error) => void> = {
	JsonWebTokenError: (res: Response, error: Error) =>
		res.status(401).json({ error: 'token missing or invalid' }),

	TokenExpirerError: (res: Response, error: Error) =>
		res.status(401).json({ error: 'token expired' }),

	SyntaxError: (res: Response, error: Error) =>
		res.status(401).json({ error: 'token invalid' }),

	defaultError: (res: Response, error: Error) => {
		console.error(error.name);
		console.error(error);
		res.status(500).end();
	},
};

export const handlerError = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	handler[error.name] != null
		? handler[error.name](res, error)
		: handler.defaultError(res, error);
};
