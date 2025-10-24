import {
	Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn
} from 'typeorm';
import { Company } from './company.entity';
import { Quotation } from './quotation.entity';
import { Order } from "./order.entity"

@Entity('customer')
export class Customer {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ name: 'email_id' })
	emailId: string;

	@Column({ name: 'phone_number' })
	phoneNumber: string;

	@Column({ nullable: true })
	address?: string;

	@Column()
	role: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ name: 'company_id' })
	companyId: string;

	@ManyToOne(() => Company, company => company.customers)
	@JoinColumn({ name: 'company_id' })
	company: Company;

	@OneToMany(() => Quotation, q => q.customer)
	quotations: Quotation[];

	@OneToMany(() => Order, o => o.customer)
	orders: Order[];
}
