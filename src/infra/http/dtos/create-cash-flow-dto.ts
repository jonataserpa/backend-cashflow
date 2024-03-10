import { ApiProperty } from '@nestjs/swagger';
import { TypeStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCashFlowDto {
  @ApiProperty({
    description: 'type default',
    example: 'ENTRY',
  })
  @IsString()
  type: TypeStatus;

  @ApiProperty({
    description: 'description default',
    example: 'Energy',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'observation default',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty()
  observation: string;

  @ApiProperty({
    description: 'companyId',
    example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({
    description: 'value ',
    example: '100.00',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    description: 'paymentedAt ',
    example: 'date paymentedAt',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  paymentedAt: Date;
}
