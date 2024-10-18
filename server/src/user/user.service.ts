import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneByCpf(cpf: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { cpf } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
