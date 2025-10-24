import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Company } from './company.entity';
import { Customer } from './customer.entity';
import { User } from './user.entity';
import { QuotationItem } from './quotation-item.entity';

@Entity('quotation')
export class Quotation {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, name: 'quotation_no' })
	quotationNo: string;

	@Column({ name: 'date_issued', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	dateIssued: Date;

	@Column({ name: 'valid_until', type: 'timestamp', nullable: true })
	validUntil?: Date;

	@Column({ name: 'total_amount', type: 'decimal' })
	totalAmount: number;

	@Column({ nullable: true })
	remarks?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ name: 'company_id' })
	companyId: string;

	@ManyToOne(() => Company, company => company.quotations)
	@JoinColumn({ name: 'company_id' })
	company: Company;

	@Column({ name: 'customer_id' })
	customerId: string;

	@ManyToOne(() => Customer, customer => customer.quotations)
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;

	@Column({ name: 'created_by' })
	createdBy: string;

	@ManyToOne(() => User, user => user.createdQuotations)
	@JoinColumn({ name: 'created_by' })
	createdUser: User;

	@OneToMany(() => QuotationItem, qi => qi.quotation)
	quotationItems: QuotationItem[];
}
