import { Guest } from '@/database/entities/guest.entity';
import { ServiceRequest } from '@/database/entities/service-request';
import { GuestsModule } from '@/guests/guests.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRequestsController } from './service-requests.controller';
import { ServiceRequestsService } from './service-requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRequest, Guest]),
    GuestsModule,
  ],
  providers: [ServiceRequestsService],
  controllers: [ServiceRequestsController],
})
export class ServiceRequestsModule { }