import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Username default',
    example: 'Username test',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
