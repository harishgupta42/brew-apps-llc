import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  author?: string;
}
