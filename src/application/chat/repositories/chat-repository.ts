import { OpenAiCompletionResponse } from '@infra/open-ai/models/open.ai.completion.response';
import { Chat } from '../entities/chat';

export abstract class ChatRepository {
  abstract create(chat: Chat): Promise<OpenAiCompletionResponse>;
}
