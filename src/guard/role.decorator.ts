import { SetMetadata } from '@nestjs/common';


export const ROLES_KEY = 'roles';
export const Roles = (...roles: Object[]) => SetMetadata(ROLES_KEY, roles);
