import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreatePurchaseOrderItemDto } from './create-purchase-order-item.dto';
import { ORDER_STATUS } from 'src/entities/enum';

export class CreatePurchaseOrderDto {
	@IsNotEmpty()
	@IsString()
	poNumber: string;

	@IsNotEmpty()
	@IsString()
	companyId: string;

	@IsNotEmpty()
	@IsString()
	supplierId: string;

	@IsNotEmpty()
	@IsString()
	createdBy: string;

	@IsOptional()
	@IsEnum(ORDER_STATUS)
	status?: ORDER_STATUS;

	@IsNotEmpty()
	@IsNumber()
	totalAmount: number;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreatePurchaseOrderItemDto)
	purchaseItems: CreatePurchaseOrderItemDto[];
}
