import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, } from 'typeorm';
import { Company } from "../../entities/company.entity";
import { Product } from '../../entities/product.entity';
import { Quotation } from '../../entities/quotation.entity'; import { PurchaseOrder } from '../../entities/purchase-order.entity';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: "name" })
	name: string;

	@Column({ unique: true, name: 'email_id' })
	emailId: string;

	@Column({ name: 'phone_number' })
	phoneNumber: string;

	@Column({ name: "password" })
	password: string;

	@Column({ name: "role" })
	role: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@OneToMany(() => Company, company => company.createdUser)
	companies: Company[];

	@OneToMany(() => Product, product => product.createdUser)
	createdProducts: Product[];

	@OneToMany(() => Product, product => product.updatedUser)
	updatedProducts: Product[];

	@OneToMany(() => Quotation, quotation => quotation.createdUser)
	createdQuotations: Quotation[];

	@OneToMany(() => PurchaseOrder, po => po.createdUser)
	createdPurchases: PurchaseOrder[];
}
