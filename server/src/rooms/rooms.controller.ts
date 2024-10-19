import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/auth/roles.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from './rooms.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  @Roles('admin',)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @Roles('admin', 'receptionist', 'guest')
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'receptionist', 'guest')
  findOne(@Param('id') id: number) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'receptionist',)
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @Roles('admin', 'receptionist')
  remove(@Param('id') id: number) {
    return this.roomsService.remove(id);
  }
}
