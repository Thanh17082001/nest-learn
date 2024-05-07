import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  password: string;
}
