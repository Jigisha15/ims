import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Company } from './company.entity';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';
import { ORDER_STATUS } from './enum';

@Entity('order')
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, name: 'order_no' })
	orderNo: string;

	@Column({ name: 'date_ordered', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	dateOrdered: Date;

	@Column({ type: 'enum', name: "status", enum: ORDER_STATUS, default: ORDER_STATUS.PENDING })
	status: ORDER_STATUS;

	@Column({ name: 'total_amount', type: 'decimal' })
	totalAmount: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ name: 'company_id' })
	companyId: string;

	@ManyToOne(() => Company, company => company.orders)
	@JoinColumn({ name: 'company_id' })
	company: Company;

	@Column({ name: 'customer_id' })
	customerId: string;

	@ManyToOne(() => Customer, customer => customer.orders)
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;

	@OneToMany(() => OrderItem, oi => oi.order)
	orderItems: OrderItem[];

	@OneToMany(() => Payment, p => p.order)
	payments: Payment[];
}
