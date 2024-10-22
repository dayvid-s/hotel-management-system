import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roomId: number;
}

export class UpdateGuestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNotEmpty()
  roomId?: number;
}
