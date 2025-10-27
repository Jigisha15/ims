import { IsArray, IsDecimal, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ORDER_STATUS } from '../../entities/enum'; // adjust import path
import { CreateOrderItemDto } from './create-order-item..dto';

export class CreateOrderDto {
	@IsNotEmpty()
	@IsString()
	companyId: string;

	@IsNotEmpty()
	@IsString()
	customerId: string;

	@IsNotEmpty()
	totalAmount: number;

	@IsOptional()
	@IsEnum(ORDER_STATUS)
	status?: ORDER_STATUS;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOrderItemDto)
	orderItems: CreateOrderItemDto[];
}
