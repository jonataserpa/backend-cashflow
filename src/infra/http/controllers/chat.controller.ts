import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SendChatUseCase } from '@application/chat/use-cases/send-chat';
import { CreateChatBody } from '../dtos/create-chat-body';
import { GetAllChatUseCase } from '@application/chat/use-cases/get-all-chat';

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
  constructor(
    private sendChatUseCase: SendChatUseCase,
    private getAllChatUseCase: GetAllChatUseCase,
  ) {}

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

  @Get('/')
  @ApiOperation({ summary: 'Get an chat' })
  @ApiOkResponse({ description: 'Get chat', type: CreateChatBody })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll() {
    return this.getAllChatUseCase.execute();
  }
}
