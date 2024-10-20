import { User } from '@/database/entities/user.entity';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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

    const { name, cpf, email, password, role } = guestDto;

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

    await this.userRepository.save(newUser);

    return newUser;
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