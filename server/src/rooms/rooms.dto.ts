import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'Room number' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ description: 'Type of the room' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Current status of the room' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Price of the room' })
  @IsDecimal()
  price: number;

  @ApiProperty({ description: 'Check-in date', required: false })
  @IsOptional()
  checkIn?: Date;

  @ApiProperty({ description: 'Check-out date', required: false })
  @IsOptional()
  checkOut?: Date;
}

export class UpdateRoomDto {
  @ApiProperty({ description: 'Room number', required: false })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiProperty({ description: 'Type of the room', required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ description: 'Current status of the room', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'Price of the room', required: false })
  @IsOptional()
  @IsDecimal()
  price?: number;

  @ApiProperty({ description: 'Indicates if the room is reserved', required: false })
  @IsOptional()
  @IsBoolean()
  isReserved?: boolean;

  @ApiProperty({ description: 'Check-in date', required: false })
  @IsOptional()
  checkIn?: Date;

  @ApiProperty({ description: 'Check-out date', required: false })
  @IsOptional()
  checkOut?: Date;
}