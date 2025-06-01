// src/auth/guards/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtener los roles requeridos del decorador @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay roles requeridos, la ruta es pública para este guard
    if (!requiredRoles) {
      return true;
    }

    // 2. Obtener el usuario del objeto request (que fue adjuntado por JwtStrategy)
    const { user } = context.switchToHttp().getRequest();

    // 3. Comparar los roles del usuario con los roles requeridos
    // Devuelve true si el usuario tiene al menos uno de los roles requeridos
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}