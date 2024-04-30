export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
