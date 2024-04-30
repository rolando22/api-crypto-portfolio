import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class PortfolioItem extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	crypto!: string;

	@Column()
	ticker!: string;

	@Column({ name: 'purchase_price', type: 'float8' })
	purchasePrice!: number;

	@Column('float8')
	amount!: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'update_at' })
	updatedAt!: Date;

	@ManyToOne(() => User, user => user.portfolioItems)
	user!: User;
}
