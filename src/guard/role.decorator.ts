import { SetMetadata } from '@nestjs/common';


export const ROLES_KEY = 'roles';
export const Roles = (...roles: Object[]) => {
    console.log('thiên thanh', roles);
    return SetMetadata(ROLES_KEY, roles);
};
