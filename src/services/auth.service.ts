import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config';
import { type IAuthService } from '../interfaces';
import { type Login } from '../types/auth';
import { type CreateUserDTO, type User as UserType } from '../types/user';
import { User } from '../db/entity';

const { jwtSecret } = config;

export class AuthService implements IAuthService {
	async login({ email, password }: Login) {
		const user = await User.findOneBy({ email });
		const passwordCorrect =
			user == null ? false : await bcrypt.compare(password, user.password);
		if (user == null || !passwordCorrect.valueOf()) return null;
		const userForToken = {
			id: user.id,
		};
		const token = jwt.sign(userForToken, jwtSecret, {
			expiresIn: 1000 * 60 * 60 * 24,
		});
		return token;
	}

	async register({ firstName, lastName, email, password }: CreateUserDTO) {
		const newUser = new User();
		newUser.firstName = firstName;
		newUser.lastName = lastName;
		newUser.email = email;
		newUser.password = await bcrypt.hash(password, 10);
		await newUser.save();
		return newUser;
	}

	async getProfile({ userId }: { userId: UserType['id'] }) {
		const user = await User.findOneBy({ id: userId });
		if (user == null) return null;
		return user;
	}
}
