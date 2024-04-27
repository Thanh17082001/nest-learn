import { IsNotEmpty, IsString } from "class-validator";

export class RolesCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string='';
}