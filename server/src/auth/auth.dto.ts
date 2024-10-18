import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  RECEPTIONIST = 'receptionist',
  GUEST = 'guest',

}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  identifier: string; //email ou CPF

  @IsNotEmpty()
  password: string;
}



export class RegisterGuestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}




export class RegisterAdminDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
