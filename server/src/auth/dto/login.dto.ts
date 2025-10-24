import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
	@IsEmail()
	emailId: string;

	@IsString()
	password: string;
}
