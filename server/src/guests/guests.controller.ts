import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateGuestDto, UpdateGuestDto } from './guests.dto';
import { GuestsService } from './guests.service';

@Controller('guests')
@UseGuards(JwtAuthGuard)
export class GuestsController {
  constructor(private readonly guestService: GuestsService) { }

  @Post()
  @Roles('admin', 'receptionist', 'guest')
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestService.create(createGuestDto);
  }

  @Get()
  @Roles('admin', 'receptionist')
  findAll() {
    return this.guestService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'receptionist', 'guest')
  findOne(@Param('id') id: string) {
    return this.guestService.findOne(+id);
  }



  @Put(':id')
  @Roles('admin', 'receptionist', 'guest')
  update(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestService.update(+id, updateGuestDto);
  }

  @Delete(':id')
  @Roles('admin', 'receptionist',)
  remove(@Param('id') id: string) {
    return this.guestService.remove(+id);
  }
}
