import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Company } from './company.entity';
import { QuotationItem } from './quotation-item.entity';
import { OrderItem } from './order-item.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
import { Category } from './category.entity';

@Entity('product')
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ name: 'model_number' })
	modelNumber: string;

	//@Column({ type: 'enum', enum: CATEGORY })
	//category: CATEGORY;

	@Column({ name: 'cost_price', type: 'decimal' })
	costPrice: number;

	@Column({ name: 'selling_price', type: 'decimal' })
	sellingPrice: number;

	@Column({ name: 'stock_quantity' })
	stockQuantity: number;

	@Column({ name: 'minimum_quantity' })
	minimumQuantity: number;

	@Column({ name: 'image_url', nullable: true })
	imageUrl?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ name: 'created_by' })
	createdBy: string;

	@ManyToOne(() => User, user => user.createdProducts)
	@JoinColumn({ name: 'created_by' })
	createdUser: User;

	@Column({ nullable: true, name: 'updated_by' })
	updatedBy: string;

	@ManyToOne(() => User, user => user.updatedProducts)
	@JoinColumn({ name: 'updated_by' })
	updatedUser: User;

	@Column({ name: 'company_id' })
	companyId: string;

	@ManyToOne(() => Company, company => company.products)
	@JoinColumn({ name: 'company_id' })
	company: Company;

	@Column({ name: 'category_id' })
	categoryId: string;

	@ManyToOne(() => Category, category => category.products)
	@JoinColumn({ name: 'category_id' })
	category: Category;

	@OneToMany(() => QuotationItem, qi => qi.product)
	quotationItems: QuotationItem[];

	@OneToMany(() => OrderItem, oi => oi.product)
	orderItems: OrderItem[];

	@OneToMany(() => PurchaseOrderItem, poi => poi.product)
	purchaseItems: PurchaseOrderItem[];
}
