import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: "string" })
  @IsString()
  logo: string;

  @ApiProperty({ type: "string" })
  @IsString()
  description: string;
}
