import { Guest } from '@/database/entities/guest.entity';
import { Reservation } from '@/database/entities/reservation.entity';
import { Room } from '@/database/entities/room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) { }

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const guest = await this.guestRepository.findOneBy({ id: createReservationDto.guestId });
    const room = await this.roomRepository.findOneBy({ id: createReservationDto.roomId });

    if (!guest || !room) {
      throw new NotFoundException('Hóspede ou quarto não encontrado');
    }

    const reservation = this.reservationRepository.create({
      guest,
      room,
      checkInDate: createReservationDto.checkInDate,
      checkOutDate: createReservationDto.checkOutDate,
    });

    return this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    const query = `
      SELECT r.*, g.name AS guestName, rm.number AS roomNumber
      FROM reservations r
      LEFT JOIN guests g ON r.guestId = g.id
      LEFT JOIN rooms rm ON r.roomId = rm.id
    `;

    const reservations = await this.reservationRepository.query(query);
    return reservations;
  }

  async findOne(id: number): Promise<Reservation> {
    const query = `
      SELECT r.*, g.name AS guestName, rm.number AS roomNumber
      FROM reservations r
      LEFT JOIN guests g ON r.guestId = g.id
      LEFT JOIN rooms rm ON r.roomId = rm.id
      WHERE r.id = $1
    `;

    const reservations = await this.reservationRepository.query(query, [id]);
    if (reservations.length === 0) {
      throw new NotFoundException(`Reserva #${id} não encontrada`);
    }

    return reservations[0];
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.findOne(id);
    Object.assign(reservation, updateReservationDto);
    return this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
  }
}
