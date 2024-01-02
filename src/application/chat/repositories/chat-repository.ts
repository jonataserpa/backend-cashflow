import { OpenAiCompletionResponse } from '@infra/open-ai/models/open.ai.completion.response';
import { Chat } from '../entities/chat';

export interface IChatPropsResponse {
  data: any[];
  headers: number;
}

export abstract class ChatRepository {
  abstract create(chat: Chat): Promise<OpenAiCompletionResponse>;
  abstract findAll(): Promise<IChatPropsResponse>;
}
