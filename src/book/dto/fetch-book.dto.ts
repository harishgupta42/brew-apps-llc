import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class FetchBookDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  keyword?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNotEmpty()
  limit?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNotEmpty()
  skip?: number;
}
