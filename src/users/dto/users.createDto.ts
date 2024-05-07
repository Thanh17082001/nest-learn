import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsArray } from "class-validator";

export class UserCreateDto {
  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: "array<string>", required: false })
  @IsArray()
  roles: string[] = [];
}
