import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from '../database/entities/guest.entity';
import { CreateGuestDto, UpdateGuestDto } from './guests.dto';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) { }

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    const guest = this.guestRepository.create(createGuestDto);
    return this.guestRepository.save(guest);
  }

  async findAll(): Promise<Guest[]> {
    return this.guestRepository.find();
  }

  async findOne(id: number): Promise<Guest> {
    const guest = await this.guestRepository.findOneBy({ id });
    if (!guest) {
      throw new NotFoundException(`Guest #${id} not found`);
    }
    return guest;
  }

  async update(id: number, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    const guest = await this.findOne(id);
    Object.assign(guest, updateGuestDto);
    return this.guestRepository.save(guest);
  }

  async remove(id: number): Promise<void> {
    const guest = await this.findOne(id);
    await this.guestRepository.remove(guest);
  }
}
