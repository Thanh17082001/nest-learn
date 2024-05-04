import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, } from 'class-validator';

export class UserUpdaeRoleDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  roleId: string;
}
