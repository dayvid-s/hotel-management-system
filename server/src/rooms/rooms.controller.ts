import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/auth/roles.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from './rooms.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  @Roles('admin')
  create(@Body() createRoomDto: CreateRoomDto, @Req() req) {
    const user = req.user;
    return this.roomsService.create(createRoomDto, user.username);
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
  @Roles('admin', 'receptionist', "guest")
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto, @Req() req) {
    const user = req.user;
    return this.roomsService.update(id, updateRoomDto, user.username);
  }

  @Delete(':id')
  @Roles('admin', 'receptionist')
  remove(@Param('id') id: number) {
    return this.roomsService.remove(id);
  }
}