import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Optional()
  status: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  description: string;
}