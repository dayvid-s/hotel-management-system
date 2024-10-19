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
    private readonly dataSource: DataSource,
  ) { }


  async create(createServiceRequestDto: CreateServiceRequestDto): Promise<ServiceRequest> {
    const serviceRequest = this.serviceRequestRepository.create(createServiceRequestDto);
    return this.serviceRequestRepository.save(serviceRequest);
  }


  async findAll(): Promise<ServiceRequest[]> {
    const query = `SELECT * FROM service_requests`;
    return await this.dataSource.query(query);
  }

  async findOne(id: number): Promise<ServiceRequest> {
    const query = `SELECT * FROM service_requests WHERE id = $1`;
    const result = await this.dataSource.query(query, [id]);

    if (result.length === 0) {
      throw new NotFoundException(`Service Request #${id} not found`);
    }

    return result[0];
  }


  async update(id: number, updateServiceRequestDto: UpdateServiceRequestDto): Promise<ServiceRequest> {
    const serviceRequest = await this.findOne(id);
    Object.assign(serviceRequest, updateServiceRequestDto);
    return this.serviceRequestRepository.save(serviceRequest);
  }


  async remove(id: number): Promise<void> {
    const serviceRequest = await this.findOne(id);
    await this.serviceRequestRepository.remove(serviceRequest);
  }
}