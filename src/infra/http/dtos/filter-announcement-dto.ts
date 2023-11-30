import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterAnnouncementDto {
  @ApiProperty({
    description: 'skip default',
    example: '',
  })
  @IsInt()
  @IsOptional()
  skip: number;

  @ApiProperty({
    description: 'take default',
    example: '',
  })
  @IsInt()
  @IsOptional()
  take: number;

  @ApiProperty({
    description: 'filter default',
    example: '',
  })
  @IsOptional()
  @IsString()
  filter: string;

  @ApiProperty({
    description: 'userId default',
    example: '',
  })
  @IsInt()
  @IsOptional()
  userId: number;

  @ApiProperty({
    description: 'companyId default',
    example: '',
  })
  @IsInt()
  @IsOptional()
  companyId: number;
}
