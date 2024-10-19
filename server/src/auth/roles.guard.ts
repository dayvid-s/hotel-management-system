import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    let user;
    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    request.user = user;


    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Você não tem permissão para acessar esta rota');
    }

    return true;
  }
}
