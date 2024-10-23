import { Log } from '@/database/entities/log.entity';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateLogDto } from './logs.dto';
import { LogsService } from './logs.service';

@ApiTags('Logs')
@Controller('logs')
@UseGuards(JwtAuthGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) { }

  @Post()
  @Roles('admin', 'receptionist')
  @ApiOperation({ summary: 'Create a new log entry' })
  @ApiResponse({ status: 201, description: 'Log entry created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logsService.create(createLogDto);
  }

  @Get()
  @Roles('admin', 'receptionist')
  @ApiOperation({ summary: 'Get all log entries' })
  @ApiResponse({ status: 200, description: 'List of log entries.' })
  async findAll(): Promise<Log[]> {
    return this.logsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'receptionist')
  @ApiOperation({ summary: 'Get a log entry by ID' })
  @ApiResponse({ status: 200, description: 'Log entry found.' })
  @ApiResponse({ status: 404, description: 'Log entry not found.' })
  async findOne(@Param('id') id: string): Promise<Log> {
    return this.logsService.findOne(+id);
  }

  @Delete(':id')
  @Roles('admin', 'receptionist')
  @ApiOperation({ summary: 'Delete a log entry by ID' })
  @ApiResponse({ status: 200, description: 'Log entry deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Log entry not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.logsService.remove(+id);
  }
}