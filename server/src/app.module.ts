import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GuestsModule } from './guests/guests.module';
import { LogsModule } from './logs/logs.module';
import { ReservationModule } from './reservation/reservation.module';
import { RoomsModule } from './rooms/rooms.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, RoomsModule, GuestsModule, ReservationModule, ServiceRequestsModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
