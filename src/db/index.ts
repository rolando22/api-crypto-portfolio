import { DataSource } from 'typeorm';
import { PortfolioItem, User } from './entity';
import { config } from '../config';

const { dbHost, dbPort, dbUser, dbPassword, dbName } = config;

const AppDataSource = new DataSource({
	type: 'postgres',
	host: dbHost,
	port: parseInt(dbPort),
	username: dbUser,
	password: dbPassword,
	database: dbName,
	synchronize: true,
	logging: true,
	entities: [User, PortfolioItem],
});

AppDataSource.initialize()
	.then(() => {
		console.log(`Database connected at: ${dbPort}`);
	})
	.catch(error => {
		console.log(error);
	});
