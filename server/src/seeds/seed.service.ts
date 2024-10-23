import { ServiceRequest } from '@/database/entities/service-request';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Guest } from '../database/entities/guest.entity';
import { Room } from '../database/entities/room.entity';
import { User, UserRole } from '../database/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>, // Adiciona o repositório de ServiceRequest
  ) { }

  async runSeed() {
    const rooms = [
      { number: '101', type: 'Duplo', status: 'Disponível', price: 100.0 },
      { number: '102', type: 'Suite', status: 'Disponível', price: 150.0 },
      { number: '103', type: 'Simples', status: 'Disponível', price: 50.0 },
      { number: '204', type: 'Suite', status: 'Disponível', price: 150.0 },
      { number: '205', type: 'Suite', status: 'Disponível', price: 150.0 },
      { number: '206', type: 'Simples', status: 'Disponível', price: 50.0 },
    ];

    for (const roomData of rooms) {
      const existingRoom = await this.roomRepository.findOneBy({ number: roomData.number });
      if (!existingRoom) {
        const room = this.roomRepository.create(roomData);
        await this.roomRepository.save(room);
      }
    }

    const adminUser = {
      name: 'João Tupi',
      email: 'user.admin@example.com',
      password: 'admin12345',
      role: 'admin',
    };

    const existingUser = await this.userRepository.findOneBy({ email: adminUser.email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);
      const user = this.userRepository.create({
        name: adminUser.name,
        email: adminUser.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      });
      await this.userRepository.save(user);
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    const guestUser = {
      name: 'Carlos Silva',
      email: 'carlos.guest@example.com',
      password: 'guest12345',
      role: 'guest',
      cpf: '12345678910',
      roomId: null,
    };

    const existingGuest = await this.guestRepository.findOneBy({ cpf: guestUser.cpf });
    if (!existingGuest) {
      const hashedPassword = await bcrypt.hash(guestUser.password, 10);


      const room = await this.roomRepository.findOneBy({ number: '206' });
      if (room) {
        guestUser.roomId = room.id;
      } else {
        console.log('Room with number 206 not found');
        return;
      }

      const guest = this.guestRepository.create({
        name: guestUser.name,
        email: guestUser.email,
        cpf: guestUser.cpf,
        roomId: guestUser.roomId,
      });
      const savedGuest = await this.guestRepository.save(guest);

      const user = this.userRepository.create({
        name: guestUser.name,
        email: guestUser.email,
        password: hashedPassword,
        role: UserRole.GUEST,
        cpf: guestUser.cpf,
        roomId: guestUser.roomId
      });
      await this.userRepository.save(user);
      console.log('Guest user created');

      const serviceRequests = [
        { description: 'Pedido de toalhas extras', status: 'pending', guestId: savedGuest.id },
        { description: 'Limpeza do quarto', status: 'pending', guestId: savedGuest.id },
        { description: 'Troca de lençóis', status: 'pending', guestId: savedGuest.id },
        { description: 'Solicitação de room service', status: 'pending', guestId: savedGuest.id },
        { description: 'Troca de lâmpada queimada', status: 'pending', guestId: savedGuest.id },
      ];

      for (const requestData of serviceRequests) {
        const serviceRequest = this.serviceRequestRepository.create(requestData);
        await this.serviceRequestRepository.save(serviceRequest);
      }

      console.log('Service requests created');
    } else {
      console.log('Guest user already exists');
    }

    console.log('Seed completed: rooms, admin user, guest, and service requests added');
  }
}