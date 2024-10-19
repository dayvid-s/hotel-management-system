import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/auth/roles.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateServiceRequestDto, UpdateServiceRequestDto } from './service-requests.dto';
import { ServiceRequestsService } from './service-requests.service';

@Controller('service-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiceRequestsController {
  constructor(private readonly serviceRequestsService: ServiceRequestsService) { }

  @Post()
  @Roles('admin', 'guest')
  create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    return this.serviceRequestsService.create(createServiceRequestDto);
  }

  @Get()
  @Roles('admin', 'receptionist')
  findAll() {
    return this.serviceRequestsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'receptionist', 'guest')
  findOne(@Param('id') id: number) {
    return this.serviceRequestsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'receptionist')
  update(@Param('id') id: number, @Body() updateServiceRequestDto: UpdateServiceRequestDto) {
    return this.serviceRequestsService.update(id, updateServiceRequestDto);
  }

  @Delete(':id')
  @Roles('admin', 'receptionist')
  remove(@Param('id') id: number) {
    return this.serviceRequestsService.remove(id);
  }
}