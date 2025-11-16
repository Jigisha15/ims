import { IsString, IsEmail, IsOptional, IsUUID, IsNotEmpty, Matches } from 'class-validator';

export class CreateCustomerDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	emailId: string;

	@IsString()
	@IsNotEmpty()
	@Matches(/^\d{10}$/, { message: 'Phone number must be a valid 10-digit number' })
	phoneNumber: string;

	@IsOptional()
	@IsString()
	address?: string;

	@IsString()
	@IsNotEmpty()
	role: string;

	@IsString()
	@IsNotEmpty()
	createdBy: string;

	@IsUUID()
	@IsNotEmpty()
	companyId: string;
}
