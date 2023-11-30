import { ApiProperty } from '@nestjs/swagger';
import { CompanyStatus } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'status default',
    example: 'ACTIVE',
  })
  @IsString()
  status: CompanyStatus;

  @ApiProperty({
    description: 'name default',
    example: 'Deer',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'socialReason default',
    example: 'socialReason',
  })
  @IsString()
  @IsNotEmpty()
  socialReason: string;

  @ApiProperty({
    description: 'url default',
    example: 'www.site.com',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'email default',
    example: 'testname@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'cnpj default',
    example: '11.726.138/0001-99',
  })
  @IsString()
  cnpj: string;

  @ApiProperty({
    description: 'phone default',
    example: '(99) 9999-9999',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'cellphone default',
    example: '(99) 99999-9999',
  })
  @IsString()
  cellphone: string;

  @ApiProperty({
    description: 'responsible default',
    example: 'Jhon',
  })
  @IsString()
  responsible: string;

  @ApiProperty({
    description: 'emailResponsible default',
    example: 'email@gmail.com',
  })
  @IsString()
  emailResponsible: string;

  @ApiProperty({
    description: 'followup default',
    example: 'test',
  })
  @IsString()
  followup: string;
}
