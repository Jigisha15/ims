import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsNotEmpty, IsPositive } from 'class-validator';
import { CATEGORY } from "../../entities/enum"

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

	@IsEnum(CATEGORY)
	@IsNotEmpty()
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
	@IsNotEmpty()
	companyId: string;

	@IsUUID()
	@IsNotEmpty()
	createdBy: string;
}
