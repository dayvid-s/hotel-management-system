import { Guest } from '@/database/entities/guest.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  providers: [GuestsService],
  controllers: [GuestsController]
})
export class GuestsModule { }
