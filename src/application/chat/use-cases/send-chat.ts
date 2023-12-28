import { Injectable } from '@nestjs/common';
import { Chat } from '../entities/chat';
import { ChatRepository } from '../repositories/chat-repository';

interface SendChatRequest {
  message: string;
}

interface SendChatResponse {
  msg: string;
}

@Injectable()
export class SendChatUseCase {
  constructor(private chatRepository: ChatRepository) {}

  async execute(request: SendChatRequest): Promise<SendChatResponse> {
    const { message } = request;

    const notification = new Chat({
      message,
    });

    const msg = await this.chatRepository.create(notification);

    return {
      msg,
    };
  }
}
