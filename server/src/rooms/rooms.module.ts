import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../database/entities/room.entity';
import { LogsModule } from '../logs/logs.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    LogsModule,
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule { }