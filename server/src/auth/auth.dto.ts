import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

enum UserRole {
  ADMIN = 'admin',
  RECEPTIONIST = 'receptionist',
  GUEST = 'guest',
}

export class LoginDto {
  @ApiProperty({ description: 'User identifier (email or CPF)' })
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  password: string;
}

export class RegisterGuestDto {
  @ApiProperty({ description: 'Name of the guest' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Guest CPF' })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({ description: 'Guest email', required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'Password for the guest account' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, description: 'Role of the user' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ description: 'ID of the room', required: false })
  @IsOptional()
  roomId: number;
}

export class RegisterAdminDto {
  @ApiProperty({ description: 'Name of the admin' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email of the admin' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password for the admin account' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, description: 'Role of the user' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}