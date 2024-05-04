import { ApiProperty } from "@nestjs/swagger/dist";
import { IsNotEmpty, IsString } from "class-validator";

export class RolesCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({required:false})
  @IsString()
  description: string = '';
}