import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RolesUpdateDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  description?: string;
}
