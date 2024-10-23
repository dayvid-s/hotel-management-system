import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceRequestDto {
  @ApiProperty({ description: 'CPF of the guest requesting the service' })
  @IsNotEmpty()
  @IsString()
  guestCpf: string;

  @ApiProperty({ description: 'Description of the service request' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Status of the service request', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateServiceRequestDto {
  @ApiProperty({ description: 'CPF of the guest requesting the service', required: false })
  @IsOptional()
  @IsString()
  guestCpf?: string;

  @ApiProperty({ description: 'Description of the service request', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Status of the service request', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}