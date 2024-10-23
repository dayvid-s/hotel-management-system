import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/auth/roles.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto, UpdateRoomDto } from './rooms.dto';
import { RoomsService } from './rooms.service';

@ApiTags('Rooms')
@Controller('rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Only admin can create rooms.' })
  create(@Body() createRoomDto: CreateRoomDto, @Req() req) {
    const user = req.user;
    return this.roomsService.create(createRoomDto, user.username);
  }

  @Get()
  @Roles('admin', 'receptionist', 'guest')
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'List of rooms returned.' })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'receptionist', 'guest')
  @ApiOperation({ summary: 'Get a room by ID' })
  @ApiResponse({ status: 200, description: 'Room details returned.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  findOne(@Param('id') id: number) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'receptionist', 'guest')
  @ApiOperation({ summary: 'Update a room' })
  @ApiResponse({ status: 200, description: 'Room updated successfully.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto, @Req() req) {
    const user = req.user;
    return this.roomsService.update(id, updateRoomDto, user.username);
  }

  @Delete(':id')
  @Roles('admin', 'receptionist')
  @ApiOperation({ summary: 'Delete a room' })
  @ApiResponse({ status: 200, description: 'Room deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  remove(@Param('id') id: number) {
    return this.roomsService.remove(id);
  }
}