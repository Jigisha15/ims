import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
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
	@MinLength(4)
	password: string;

	@IsNotEmpty()
	@IsString()
	role: string;
}
