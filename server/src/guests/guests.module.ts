import { AuthModule } from '@/auth/auth.module';
import { Guest } from '@/database/entities/guest.entity';
import { LogsModule } from '@/logs/logs.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guest]),
    LogsModule,
    AuthModule
  ],
  providers: [GuestsService],
  controllers: [GuestsController],
  exports: [GuestsService],
})
export class GuestsModule { }
