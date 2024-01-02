import { Injectable } from '@nestjs/common';
import { Chat } from '@application/chat/entities/chat';
import { PrismaService } from '../prisma.service';
import {
  ChatRepository,
  IChatPropsResponse,
} from '@application/chat/repositories/chat-repository';
import { OpenAiService } from '@infra/open-ai/open-ai.service';
import { ChatCompletionRequestMessage } from 'openai';
import { OpenAiCompletionResponse } from '@infra/open-ai/models/open.ai.completion.response';

@Injectable()
export class PrismaChatRepository implements ChatRepository {
  constructor(private prisma: PrismaService, private openai: OpenAiService) {}

  async create(chat: Chat): Promise<OpenAiCompletionResponse> {
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: 'user',
        content: chat.message,
      },
    ];

    const result = await this.openai.completion(messages);

    await this.prisma.chat.create({
      data: {
        message: chat.message,
        response: result.message.content,
        type: 1,
      },
    });

    return result;
  }

  async findAll() {
    const data = await this.prisma.chat.findMany({
      where: {
        deleteAt: null,
      },
      orderBy: {
        id: 'desc',
      },
    });

    const dataChat = {
      data,
      headers: data.length === 1 ? 1 : data.length,
    };
    return dataChat;
  }
}
