import { Chat } from '../entities/chat';

export abstract class ChatRepository {
  abstract create(chat: Chat): Promise<string>;
}
