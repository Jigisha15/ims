import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('transaction')
export class Transaction {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	date: Date;

	@Column()
	type: string;

	@Column({ name: 'reference_id', nullable: true })
	referenceId?: string;

	@Column({ type: 'decimal' })
	amount: number;

	@Column({ nullable: true })
	description?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	//@OneToOne(() => Payment, payment => payment.transaction)
	//@JoinColumn({ name: 'payment_id' })
	//payment: Payment;
}
