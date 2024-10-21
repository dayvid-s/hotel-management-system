import { Log } from '@/database/entities/log.entity';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateLogDto } from './logs.dto';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) { }

  @Post()
  create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logsService.create(createLogDto);
  }

  @Get()
  findAll(): Promise<Log[]> {
    return this.logsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Log> {
    return this.logsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.logsService.remove(+id);
  }
}