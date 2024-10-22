import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceRequestDto {
  @IsNotEmpty()
  @IsString()
  guestCpf: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateServiceRequestDto {
  @IsOptional()
  @IsString()
  guestCpf?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
