import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	emailId: string;

	@IsNotEmpty()
	@IsString()
	phoneNumber: string;

	@IsNotEmpty()
	@IsString()
	address: string;

	@IsNotEmpty()
	@IsString()
	gstin: string;

	@IsNotEmpty()
	@IsString()
	createdBy: string;
}
