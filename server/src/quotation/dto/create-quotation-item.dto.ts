import { IsUUID, IsOptional, IsNumber, IsString, IsNotEmpty, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuotationItemDto {
	@IsUUID()
	@IsNotEmpty()
	productId: string;

	@IsNumber()
	@IsNotEmpty()
	quantity: number;

	@IsNumber()
	@IsNotEmpty()
	price: number;

	@IsNumber()
	@IsNotEmpty()
	subtotal: number;
}