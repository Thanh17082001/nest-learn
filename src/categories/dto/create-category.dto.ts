import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class CreateCategoryDto {
  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: "string" })
  @IsString()
  description: string;
}
