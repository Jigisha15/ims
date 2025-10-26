import { IsOptional, IsString, IsNumber, IsNotEmpty, IsUUID, ValidateNested, ArrayMinSize, IsArray } from "class-validator";
import { CreateQuotationItemDto } from "src/quotation/dto/create-quotation-item.dto";
import { Type } from 'class-transformer';

export class QuotationItemDto {
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

export class CreateQuotationDto {
	@IsNotEmpty()
	@IsString()
	companyId: string;

	@IsNotEmpty()
	@IsString()
	customerId: string;

	@IsNotEmpty()
	@IsString()
	createdBy: string;

	@IsOptional()
	remarks?: string;

	@IsNotEmpty()
	totalAmount: number;

	@IsArray()
	@Type(() => QuotationItemDto)
	quotationItems: QuotationItemDto[];
}