import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	modelNumber: string;

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
	@IsNotEmpty()
	companyId: string;

	@IsUUID()
	@IsNotEmpty()
	categoryId: string;

	@IsUUID()
	@IsNotEmpty()
	createdBy: string;
}