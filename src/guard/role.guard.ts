
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/roles/shcemas/roles.shcema';
import { ROLES_KEY } from './role.decorator';
import { RoleInterface } from 'src/roles/interface/roles.interface';
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles =  this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const user = request['user'];
        if (user.isAdmin) {
          return true;
        }
        if (requiredRoles.length<0) {
            return false;
        }
        return user.roles.some((role:any) =>requiredRoles.includes(role.name.toLowerCase()));
    }
}