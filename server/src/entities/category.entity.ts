import {
	Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn
} from 'typeorm';
import { Product } from './product.entity';

@Entity('category')
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToMany(() => Product, product => product.category)
	products: Product[];
}