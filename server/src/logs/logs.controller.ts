import { Log } from '@/database/entities/log.entity';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateLogDto } from './logs.dto';
import { LogsService } from './logs.service';

@Controller('logs')
@UseGuards(JwtAuthGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) { }

  @Post()
  @Roles('admin', 'receptionist')
  create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logsService.create(createLogDto);
  }

  @Get()
  @Roles('admin', 'receptionist')
  findAll(): Promise<Log[]> {
    return this.logsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'receptionist')
  findOne(@Param('id') id: string): Promise<Log> {
    return this.logsService.findOne(+id);
  }

  @Delete(':id')
  @Roles('admin', 'receptionist')
  remove(@Param('id') id: string): Promise<void> {
    return this.logsService.remove(+id);
  }
}