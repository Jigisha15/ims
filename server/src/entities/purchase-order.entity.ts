import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Company } from './company.entity';
import { Supplier } from './supplier.entity';
import { User } from './user.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
import { ORDER_STATUS } from './enum';

@Entity('purchase_order')
export class PurchaseOrder {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, name: 'po_number' })
	poNumber: string;

	@Column({ name: 'date_ordered', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	dateOrdered: Date;

	@Column({ name: 'total_amount', type: 'decimal' })
	totalAmount: number;

	@Column({ type: 'enum', enum: ORDER_STATUS, default: ORDER_STATUS.PENDING })
	status: ORDER_STATUS;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ name: 'company_id' })
	companyId: string;

	@ManyToOne(() => Company, company => company.purchases)
	@JoinColumn({ name: 'company_id' })
	company: Company;

	@Column({ name: 'supplier_id' })
	supplierId: string;

	@ManyToOne(() => Supplier, s => s.purchaseOrders)
	@JoinColumn({ name: 'supplier_id' })
	supplier: Supplier;

	@Column({ name: 'created_by' })
	createdBy: string;

	@ManyToOne(() => User, user => user.createdPurchases)
	@JoinColumn({ name: 'created_by' })
	createdUser: User;

	@OneToMany(() => PurchaseOrderItem, poi => poi.purchaseOrder)
	purchaseItems: PurchaseOrderItem[];
}
