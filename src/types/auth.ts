export interface Login {
	email: string;
	password: string;
}

export interface Config {
	port: string | number;
	dbUser: string;
	dbPassword: string;
	dbHost: string;
	dbName: string;
	dbPort: string;
	jwtSecret: string;
}
