import { Injectable } from '@nestjs/common';
import {
  ChatRepository,
  IChatPropsResponse,
} from '../repositories/chat-repository';

@Injectable()
export class GetAllChatUseCase {
  constructor(private chatRepository: ChatRepository) {}

  async execute(): Promise<IChatPropsResponse> {
    const chat = await this.chatRepository.findAll();

    return chat;
  }
}
