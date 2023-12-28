import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SendChatUseCase } from '@application/chat/use-cases/send-chat';
import { CreateChatBody } from '../dtos/create-chat-body';

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private sendChatUseCase: SendChatUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Chat message' })
  @ApiCreatedResponse({
    description: 'Chat message',
    type: CreateChatBody,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateChatBody })
  async create(@Body() body: CreateChatBody) {
    const { message } = body;

    const { msg } = await this.sendChatUseCase.execute({
      message,
    });

    return {
      message: msg,
    };
  }
}
