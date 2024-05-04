import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/roles/shcemas/roles.shcema';
import { ROLES_KEY } from './role.decorator';
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(requiredRoles);
        const request = context.switchToHttp().getRequest();
        const user = request['user'];
        console.log(user);
        if (user.roles.includes('66324effc20a111bedb444ef')) {
            return true;
        }
        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}