import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'name default',
    example: 'Service name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'status default',
    example: 'status',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
