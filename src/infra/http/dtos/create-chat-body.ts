import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateChatBody {
  @ApiProperty({
    description: 'message default',
    example: 'How create video on youtube',
  })
  @IsNotEmpty()
  @Length(0, 1000)
  @IsString()
  message: string;
}
