import {
	Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn
} from 'typeorm';
import { Company } from './company.entity';
import { PurchaseOrder } from './purchase-order.entity';

@Entity('supplier')
export class Supplier {
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

	@ManyToOne(() => Company, company => company.suppliers)
	@JoinColumn({ name: 'company_id' })
	company: Company;

	@OneToMany(() => PurchaseOrder, po => po.supplier)
	purchaseOrders: PurchaseOrder[];
}
