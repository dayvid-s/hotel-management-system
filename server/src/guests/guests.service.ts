import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from '../database/entities/guest.entity';
import { LogsService } from '../logs/logs.service';
import { CreateGuestDto, UpdateGuestDto } from './guests.dto';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    private readonly logsService: LogsService,
  ) { }

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    const guest = this.guestRepository.create(createGuestDto);
    const savedGuest = await this.guestRepository.save(guest);

    await this.logsService.create({
      name: 'Criação de Hóspede',
      status: 'Sucesso',
      description: `Usuário criou um novo hóspede com ID: ${savedGuest.id}.e nome ${savedGuest.name} `,
    });
    return savedGuest;
  }

  async findAll(): Promise<Guest[]> {
    return this.guestRepository.createQueryBuilder('guest').getMany();
  }

  async findOne(id: number): Promise<Guest> {
    const guest = await this.guestRepository.createQueryBuilder('guest')
      .where('guest.id = :id', { id })
      .getOne();
    if (!guest) {
      throw new NotFoundException(`Guest #${id} not found`);
    }
    return guest;
  }

  async update(id: number, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    const guest = await this.findOne(id);
    Object.assign(guest, updateGuestDto);
    const updatedGuest = await this.guestRepository.save(guest);

    await this.logsService.create({
      name: 'Atualização de Hóspede',
      status: 'Sucesso',
      description: `Usuário atualizou o hóspede com ID: ${updatedGuest.id}.`,
    });

    return updatedGuest;
  }

  async remove(id: number): Promise<void> {
    const guest = await this.findOne(id);
    await this.guestRepository.remove(guest);

    await this.logsService.create({
      name: 'Remoção de Hóspede',
      status: 'Sucesso',
      description: `Usuário removeu o hóspede com ID: ${guest.id}.`,
    });
  }
}