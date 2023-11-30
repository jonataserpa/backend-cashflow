import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'firstName default',
    example: 'Jhon test',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'lastName default',
    example: 'Deer',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'genre default',
    example: 'Male',
  })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({
    description: 'phone default',
    example: '(99) 99999-9999',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'email default',
    example: 'testname@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'dateBorn default',
    example: '1990-05-15T11:00:00.000Z',
  })
  @IsDateString({}, { each: true })
  @IsOptional()
  dateBorn: Date;

  @ApiProperty({
    description: 'documentType default',
    example: 'CPF',
  })
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @ApiProperty({
    description: 'documentType default',
    example: 'CPF',
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    description: 'photo default',
    example: 'image.png',
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    description: 'business default',
    example: 'area dev',
  })
  @IsString()
  @IsOptional()
  business: string;

  @ApiProperty({
    description: 'password default',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'companyId default',
    example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({
    description: 'Address default',
    example: '[]',
  })
  @IsOptional()
  address: Address[];

  @ApiProperty({
    description: 'image',
    example: 'image.png',
  })
  @IsString()
  @IsOptional()
  image: string;
}
