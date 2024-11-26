import { ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  @Inject()
  private readonly reflector: Reflector

  @Inject()
  private readonly jwtService: JwtService

  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }
    
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    
    const payload = this.jwtService.verify(token);
    const userRoles = payload.roles || [];
    const hasRole = () =>
      userRoles.some((role) => requiredRoles.includes(role));
    if (!hasRole()) {
      throw new ForbiddenException('Insufficient permissions');
    }
    
    return true;
  }
}