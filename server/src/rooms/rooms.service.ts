import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../database/entities/room.entity';
import { LogsService } from '../logs/logs.service';
import { CreateRoomDto, UpdateRoomDto } from './rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly logsService: LogsService,
  ) { }

  async create(createRoomDto: CreateRoomDto, user: string): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);
    const savedRoom = await this.roomRepository.save(room);

    const logMessage = `Usuário ${user} criou o quarto número: ${savedRoom.number}, e o status do quarto é: ${savedRoom.status}`;

    await this.logsService.create({
      name: 'Criação de Quarto',
      status: "Sucesso",
      description: logMessage,
    });

    return savedRoom;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto, user: string): Promise<Room> {
    const room = await this.findOne(id);

    Object.assign(room, updateRoomDto);
    const updatedRoom = await this.roomRepository.save(room);

    const logMessage = `Usuário ${user} atualizou o quarto número: ${updatedRoom.number}, e o novo status do quarto é: ${updatedRoom.status}`;

    await this.logsService.create({
      name: 'Atualização de Quarto',
      status: "Sucesso",
      description: logMessage,
    });

    return updatedRoom;
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOneBy({ id });
    if (!room) {
      throw new NotFoundException(`Room #${id} not found`);
    }
    return room;
  }

  async remove(id: number): Promise<void> {
    const room = await this.findOne(id);
    await this.roomRepository.remove(room);
  }
}