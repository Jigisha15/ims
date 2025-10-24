import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';


export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
	@IsOptional()
	@IsString()
	name?: string;

	@IsEmail()
	@IsOptional()
	emailId?: string;

	@IsOptional()
	@IsString()
	phoneNumber?: string;

	@IsOptional()
	@IsString()
	address?: string;

	@IsOptional()
	@IsString()
	gstin?: string;

	@IsOptional()
	@IsString()
	createdBy?: string;
}
