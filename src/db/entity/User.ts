import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { PortfolioItem } from './PortfolioItem';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'first_name' })
	firstName!: string;

	@Column({ name: 'last_name' })
	lastName!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'update_at' })
	updatedAt!: Date;

	@OneToMany(() => PortfolioItem, item => item.user)
	portfolioItems!: PortfolioItem[];
}
