import { ApiProperty } from '@nestjs/swagger';
import { TypeStatus } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCashFlowDto {
  @ApiProperty({
    description: 'type default',
    example: 'ENTRY',
  })
  @IsString()
  type: TypeStatus;

  @ApiProperty({
    description: 'description default',
    example: 'Deer',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'observation default',
    example: 'observation',
  })
  @IsString()
  @IsNotEmpty()
  observation: string;
}
