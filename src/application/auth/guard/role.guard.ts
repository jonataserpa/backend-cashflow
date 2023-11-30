import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('role::: ', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('request::: ', request?.user);
    if (request?.user) {
      const user = request.user;
      return roles.includes(user.role);
    }

    return false;
  }
}
