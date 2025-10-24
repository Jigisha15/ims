import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn
} from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { Product } from './product.entity';

@Entity('purchase_order_item')
export class PurchaseOrderItem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	quantity: number;

	@Column({ type: 'decimal' })
	price: number;

	@Column({ type: 'decimal' })
	subtotal: number;

	@Column({ name: 'purchase_order_id' })
	purchaseOrderId: string;

	@ManyToOne(() => PurchaseOrder, po => po.purchaseItems)
	@JoinColumn({ name: 'purchase_order_id' })
	purchaseOrder: PurchaseOrder;

	@Column({ name: 'product_id' })
	productId: string;

	@ManyToOne(() => Product, p => p.purchaseItems)
	@JoinColumn({ name: 'product_id' })
	product: Product;
}
