import { IsNotEmpty, IsString, } from 'class-validator';

export class UserUpdaeRoleDto {
    @IsNotEmpty()
    @IsString()
    roleId: string;
}
