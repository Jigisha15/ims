import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	@IsEmail()
	emailId?: string;

	@IsOptional()
	@IsString()
	phoneNumber?: string;

	@IsOptional()
	@IsString()
	role?: string;
}
