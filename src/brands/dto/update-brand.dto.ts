import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  logo: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;
}
