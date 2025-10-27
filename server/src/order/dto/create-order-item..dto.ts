import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderItemDto {
	@IsNotEmpty()
	@IsString()
	productId: string;

	@IsNotEmpty()
	quantity: number;

	@IsNotEmpty()
	price: number;

	@IsNotEmpty()
	subtotal: number;
}