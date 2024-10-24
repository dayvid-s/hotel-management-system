import { Guest } from '@/database/entities/guest.entity';
import { ServiceRequest } from '@/database/entities/service-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateServiceRequestDto, UpdateServiceRequestDto } from './service-requests.dto';

@Injectable()
export class ServiceRequestsService {
  constructor(
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createServiceRequestDto: CreateServiceRequestDto): Promise<ServiceRequest> {
    const { guestCpf, description, status } = createServiceRequestDto;

    const guest = await this.guestRepository.findOne({ where: { cpf: guestCpf } });
    if (!guest) {
      throw new NotFoundException(`Guest with CPF ${guestCpf} not found`);
    }

    const serviceRequest = this.serviceRequestRepository.create({
      guestId: guest.id,
      description,
      status,
    });

    return this.serviceRequestRepository.save(serviceRequest);
  }

  async findAll(): Promise<ServiceRequest[]> {
    return this.serviceRequestRepository.find();
  }

  async findOne(id: number): Promise<ServiceRequest> {
    const serviceRequest = await this.serviceRequestRepository
      .createQueryBuilder('serviceRequest')
      .where('serviceRequest.id = :id', { id })
      .getOne();

    if (!serviceRequest) {
      throw new NotFoundException(`Service Request #${id} not found`);
    }

    return serviceRequest;
  }

  async update(id: number, updateServiceRequestDto: UpdateServiceRequestDto): Promise<ServiceRequest> {
    const { guestCpf } = updateServiceRequestDto;

    const serviceRequest = await this.findOne(id);

    if (guestCpf) {
      const guest = await this.guestRepository.findOne({ where: { cpf: guestCpf } });
      if (!guest) {
        throw new NotFoundException(`Guest with CPF ${guestCpf} not found`);
      }
      serviceRequest.guestId = guest.id;
    }

    Object.assign(serviceRequest, updateServiceRequestDto);
    return this.serviceRequestRepository.save(serviceRequest);
  }

  async remove(id: number): Promise<void> {
    const serviceRequest = await this.findOne(id);
    await this.serviceRequestRepository.remove(serviceRequest);
  }

  async findByGuestCpf(guestCpf: string): Promise<ServiceRequest[]> {

    const guest = await this.guestRepository.findOne({ where: { cpf: guestCpf } });
    if (!guest) {
      throw new NotFoundException(`Guest with CPF ${guestCpf} not found`);
    }
    const requests = await this.serviceRequestRepository
      .createQueryBuilder('serviceRequest')
      .leftJoinAndSelect('serviceRequest.guest', 'guest')
      .where('guest.id = :guestId', { guestId: guest.id })
      .getMany();

    return requests;
  }
}