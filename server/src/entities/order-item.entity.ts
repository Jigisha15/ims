import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('order_item')
export class OrderItem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: "quantity" })
	quantity: number;

	@Column({ type: 'decimal', name: "price" })
	price: number;

	@Column({ type: 'decimal', name: "subtotal" })
	subtotal: number;

	@Column({ name: 'order_id' })
	orderId: string;

	@ManyToOne(() => Order, o => o.orderItems)
	@JoinColumn({ name: 'order_id' })
	order: Order;

	@Column({ name: 'product_id' })
	productId: string;

	@ManyToOne(() => Product, p => p.orderItems)
	@JoinColumn({ name: 'product_id' })
	product: Product;
}
