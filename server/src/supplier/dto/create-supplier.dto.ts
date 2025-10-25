import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateSupplierDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	emailId: string;

	@IsNotEmpty()
	@IsString()
	phoneNumber: string;

	@IsNotEmpty()
	@IsString()
	role: string;

	@IsNotEmpty()
	@IsUUID()
	companyId: string;
}
