import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/auth/roles.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateServiceRequestDto, UpdateServiceRequestDto } from './service-requests.dto';
import { ServiceRequestsService } from './service-requests.service';

@ApiTags('Service Requests')
@Controller('service-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiceRequestsController {
  constructor(private readonly serviceRequestsService: ServiceRequestsService) { }

  @Post()
  @Roles('admin', 'guest')
  @ApiOperation({ summary: 'Create a new service request' })
  @ApiResponse({ status: 201, description: 'Service request created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    return this.serviceRequestsService.create(createServiceRequestDto);
  }

  @Get()
  @Roles('admin', 'receptionist', 'guest')
  @ApiOperation({ summary: 'Get all service requests or filter by guest CPF' })
  @ApiResponse({ status: 200, description: 'List of service requests.' })
  @ApiResponse({ status: 404, description: 'No service requests found.' })
  async findAll(@Query('guestCpf') guestCpf?: string) {
    if (guestCpf) {
      return this.serviceRequestsService.findByGuestCpf(guestCpf);
    }
    return this.serviceRequestsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'receptionist', 'guest')
  @ApiOperation({ summary: 'Get a service request by ID' })
  @ApiResponse({ status: 200, description: 'Service request found.' })
  @ApiResponse({ status: 404, description: 'Service request not found.' })
  async findOne(@Param('id') id: number) {
    return this.serviceRequestsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'receptionist')
  @ApiOperation({ summary: 'Update a service request by ID' })
  @ApiResponse({ status: 200, description: 'Service request updated successfully.' })
  @ApiResponse({ status: 404, description: 'Service request not found.' })
  async update(@Param('id') id: number, @Body() updateServiceRequestDto: UpdateServiceRequestDto) {
    return this.serviceRequestsService.update(id, updateServiceRequestDto);
  }

  @Delete(':id')
  @Roles('admin', 'receptionist')
  @ApiOperation({ summary: 'Delete a service request by ID' })
  @ApiResponse({ status: 200, description: 'Service request deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Service request not found.' })
  async remove(@Param('id') id: number) {
    return this.serviceRequestsService.remove(id);
  }
}