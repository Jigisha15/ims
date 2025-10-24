import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn
} from 'typeorm';
import { Quotation } from './quotation.entity';
import { Product } from './product.entity';

@Entity('quotation_item')
export class QuotationItem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	quantity: number;

	@Column({ type: 'decimal' })
	price: number;

	@Column({ type: 'decimal' })
	subtotal: number;

	@Column({ name: 'quotation_id' })
	quotationId: string;

	@ManyToOne(() => Quotation, q => q.quotationItems)
	@JoinColumn({ name: 'quotation_id' })
	quotation: Quotation;

	@Column({ name: 'product_id' })
	productId: string;

	@ManyToOne(() => Product, p => p.quotationItems)
	@JoinColumn({ name: 'product_id' })
	product: Product;
}
