import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsOptional, IsEnum, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { CATEGORY } from 'src/entities/enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {
	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	description: string;

	@IsString()
	@IsOptional()
	modelNumber: string;

	@IsEnum(CATEGORY)
	@IsOptional()
	category: CATEGORY;

	@IsNumber()
	@IsPositive()
	costPrice: number;

	@IsNumber()
	@IsPositive()
	sellingPrice: number;

	@IsNumber()
	@IsPositive()
	stockQuantity: number;

	@IsNumber()
	@IsPositive()
	minimumQuantity: number;

	@IsOptional()
	@IsString()
	imageUrl?: string;

	@IsUUID()
	@IsOptional()
	companyId: string;

	@IsString()
	@IsOptional()
	createdBy: string;
}
