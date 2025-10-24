import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
	@MinLength(4)
	password?: string;
}
