import dotenv from 'dotenv';
import { type Config } from '../types/auth';

dotenv.config();

export const config: Config = {
	port: process.env.PORT ?? 3001,
	dbUser: process.env.PG_USER ?? '',
	dbPassword: process.env.PG_PASSWORD ?? '',
	dbHost: process.env.PG_HOST ?? '',
	dbName: process.env.PG_DATABASE ?? '',
	dbPort: process.env.PG_PORT ?? '',
	jwtSecret: process.env.JWT_SECRET ?? '',
};
