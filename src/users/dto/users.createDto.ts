import { IsNotEmpty, IsString, IsInt, IsArray } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsArray()
  roles: string[] = [];
}
