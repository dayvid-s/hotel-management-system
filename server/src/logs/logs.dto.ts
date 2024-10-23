import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLogDto {
  @ApiProperty({
    description: 'The name of the log entry',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'The status of the log entry (optional)',
    required: false,
  })
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Detailed description of the log entry',
    maxLength: 10000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  description: string;
}