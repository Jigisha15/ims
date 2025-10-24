import {
	Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn
} from 'typeorm';
import { User } from "./user.entity";
import { Supplier } from "./supplier.entity"
import { Customer } from './customer.entity';
import { Product } from './product.entity';
import { Quotation } from './quotation.entity';
import { Order } from './order.entity';
import { PurchaseOrder } from "./purchase-order.entity"

@Entity('company')
export class Company {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ name: 'email_id' })
	emailId: string;

	@Column({ name: 'phone_number' })
	phoneNumber: string;

	@Column()
	address: string;

	@Column()
	gstin: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ name: 'created_by' })
	createdBy: string;

	@ManyToOne(() => User, user => user.companies)
	@JoinColumn({ name: 'created_by' })
	createdUser: User;

	@OneToMany(() => Supplier, supplier => supplier.company)
	suppliers: Supplier[];

	@OneToMany(() => Customer, customer => customer.company)
	customers: Customer[];

	@OneToMany(() => Product, product => product.company)
	products: Product[];

	@OneToMany(() => Quotation, quotation => quotation.company)
	quotations: Quotation[];

	@OneToMany(() => Order, order => order.company)
	orders: Order[];

	@OneToMany(() => PurchaseOrder, po => po.company)
	purchases: PurchaseOrder[];
}
