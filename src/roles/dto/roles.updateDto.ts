import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

export class RolesUpdateDto {
  @ApiProperty({ type: "string" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: "string" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
