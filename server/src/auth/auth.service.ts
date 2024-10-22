import { User } from '@/database/entities/user.entity';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync as bcryptCompareSync, hashSync as bcryptHashSync } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { LoginDto, RegisterAdminDto, RegisterGuestDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async registerGuest(registerDto: RegisterGuestDto): Promise<User> {
    const guestDto = plainToClass(RegisterGuestDto, registerDto);

    const { name, cpf, email, password, role, roomId } = guestDto;

    const existingUser = await this.userRepository.findOne({ where: { cpf } });
    if (existingUser) {
      throw new ConflictException('CPF já registrado');
    }

    const newUser = new User();
    newUser.name = name;
    newUser.cpf = cpf;
    newUser.email = email;
    newUser.password = bcryptHashSync(password, 10);
    newUser.role = role;
    newUser.roomId = roomId;

    await this.userRepository.save(newUser);

    return newUser;
  }
  async updateUserByCpf(cpf: string, updatedData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { cpf } });
    if (!user) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado.`);
    }
    if (updatedData.name) {
      user.name = updatedData.name;
    }
    if (updatedData.email) {
      user.email = updatedData.email;
    }
    if (updatedData.cpf) {
      user.cpf = updatedData.cpf;
    }
    if (updatedData.password) {
      user.password = bcryptHashSync(updatedData.password, 10);
    }
    if (updatedData.role) {
      user.role = updatedData.role;
    }
    if (updatedData.roomId) {
      user.roomId = updatedData.roomId;
    }

    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }

  async registerAdmin(registerDto: RegisterAdminDto): Promise<User> {
    const adminDto = plainToClass(RegisterAdminDto, registerDto);

    const { name, email, password, role } = adminDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email já registrado');
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = bcryptHashSync(password, 10);
    newUser.role = role;

    await this.userRepository.save(newUser);

    return newUser;
  }

  async login(loginDto: LoginDto): Promise<{ user: any, token: string }> {
    const { identifier, password } = loginDto;

    let user: User | null = null;

    if (identifier.includes('@')) {
      user = await this.userRepository.findOne({ where: { email: identifier } });
    } else {
      user = await this.userRepository.findOne({ where: { cpf: identifier } });
    }

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const isPasswordValid = bcryptCompareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const payload = { username: user.name, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}