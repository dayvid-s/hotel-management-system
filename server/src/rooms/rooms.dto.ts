import { IsBoolean, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsDecimal()
  price: number;

  @IsOptional()
  checkIn?: Date;

  @IsOptional()
  checkOut?: Date;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsOptional()
  @IsBoolean()
  isReserved?: boolean;

  @IsOptional()
  checkIn?: Date;

  @IsOptional()
  checkOut?: Date;
}