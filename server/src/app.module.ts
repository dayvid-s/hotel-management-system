import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { Guest } from './database/entities/guest.entity';
import { Room } from './database/entities/room.entity';
import { ServiceRequest } from './database/entities/service-request';
import { User } from './database/entities/user.entity';
import { GuestsModule } from './guests/guests.module';
import { LogsModule } from './logs/logs.module';
import { ReservationModule } from './reservation/reservation.module';
import { RoomsModule } from './rooms/rooms.module';
import { SeedService } from './seeds/seed.service';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    RoomsModule,
    GuestsModule,
    ReservationModule,
    ServiceRequestsModule,
    LogsModule,
    TypeOrmModule.forFeature([Room, User, Guest, ServiceRequest]),
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule { }