import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  guestId: number;

  @IsNotEmpty()
  roomId: number;

  @IsDate()
  checkInDate: Date;

  @IsDate()
  checkOutDate: Date;
}

export class UpdateReservationDto {
  @IsDate()
  checkInDate?: Date;

  @IsDate()
  checkOutDate?: Date;
}
