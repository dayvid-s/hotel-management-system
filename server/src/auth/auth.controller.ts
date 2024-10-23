import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterAdminDto, RegisterGuestDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register/guest')
  @ApiOperation({ summary: 'Register a new guest' })
  @ApiResponse({ status: 201, description: 'Guest registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation errors.' })
  async registerGuest(@Body() registerGuestDto: RegisterGuestDto) {
    return this.authService.registerGuest(registerGuestDto);
  }

  @Post('register/admin')
  @ApiOperation({ summary: 'Register a new admin' })
  @ApiResponse({ status: 201, description: 'Admin registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation errors.' })
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    return this.authService.registerAdmin(registerAdminDto);
  }
}