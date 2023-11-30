import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategorieDto {
  @ApiProperty({
    description: 'title default',
    example: 'Categorie test',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'uri default',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty()
  uri: string;

  @ApiProperty({
    description: 'description default',
    example: 'Categorie desc',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'cover default',
    example: 'cover',
  })
  @IsString()
  cover: string;

  @ApiProperty({
    description: 'type default',
    example: 'type',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'companyId default',
    example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  companyId: number;
}
