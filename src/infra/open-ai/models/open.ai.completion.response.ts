import { ApiProperty } from '@nestjs/swagger';

type TContent = {
  role: string;
  content: string;
};

export class OpenAiCompletionResponse {
  @ApiProperty()
  message: TContent;
}
