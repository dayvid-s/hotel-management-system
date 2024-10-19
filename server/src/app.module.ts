import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GuestsModule } from './guests/guests.module';
import { RoomsModule } from './rooms/rooms.module';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, RoomsModule, GuestsModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
