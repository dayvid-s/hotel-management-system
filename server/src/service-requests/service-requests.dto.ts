import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceRequestDto {
  @IsNotEmpty()
  @IsNumber()
  guestId: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateServiceRequestDto {
  @IsOptional()
  @IsNumber()
  guestId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;
}