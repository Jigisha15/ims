import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from '../../auth/dto/create-auth.dto';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
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
