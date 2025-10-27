import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PAYMENT_METHOD, PAYMENT_STATUS } from './enum';
import { Order } from './order.entity';

@Entity('payment')
export class Payment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'enum', enum: PAYMENT_METHOD, name: 'payment_method' })
	PAYMENT_METHOD: PAYMENT_METHOD;

	@Column({ type: 'enum', enum: PAYMENT_STATUS, name: 'payment_status', default: PAYMENT_STATUS.PENDING })
	PAYMENT_STATUS: PAYMENT_STATUS;

	@Column({ type: 'decimal' })
	amount: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	date: Date;

	@Column({ nullable: true })
	remarks?: string;

	@Column({ name: 'order_id', nullable: true })
	orderId?: string;

	@ManyToOne(() => Order, order => order.payments)
	@JoinColumn({ name: 'order_id' })
	order?: Order;

	//@OneToOne(() => Transaction, transaction => transaction.payment)
	//transaction: Transaction;
}
