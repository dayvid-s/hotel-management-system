import { Guest } from '@/database/entities/guest.entity';
import { Reservation } from '@/database/entities/reservation.entity';
import { Room } from '@/database/entities/room.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Guest, Room])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule { }
