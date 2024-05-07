import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

interface image {
  file: Buffer;
  contentType: string;
}
export class CreateProductDto {
  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  typeId: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: "string" })
  // @IsNotEmpty()
  image: image;

  @ApiProperty({ type: "string", required: false })
  description: string='';
  @ApiProperty({ type: "string", required: false })
  priceImport: number=0;

  @ApiProperty({ type: "number", required: false })
  @IsNumber()
  priceSale: number=0;

  @ApiProperty({ type: "number", required: false })
  @IsNumber()
  quantityImport: number=0;

  @ApiProperty({ type: "number", required: false })
  @IsNumber()
  quantitySale: number=0;

  @ApiProperty({ type: "date", required: false })
  dateImport?: Date =null;
}
