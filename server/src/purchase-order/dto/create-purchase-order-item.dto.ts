import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePurchaseOrderItemDto {
	@IsNotEmpty()
	@IsString()
	productId: string;

	@IsNotEmpty()
	@IsNumber()
	quantity: number;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsNotEmpty()
	@IsNumber()
	subtotal: number;
}
