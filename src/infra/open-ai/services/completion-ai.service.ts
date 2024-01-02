import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import { OpenAiCompletionResponse } from '../models/open.ai.completion.response';

export class OpenAiCompletionService {
  private readonly DEFAULT_COMPLETION_MODEL = 'gpt-3.5-turbo';

  constructor(private readonly service: OpenAIApi) {}

  async textCompletion(
    messages: ChatCompletionRequestMessage[],
  ): Promise<OpenAiCompletionResponse> {
    const result = await this.service.createChatCompletion({
      model: this.DEFAULT_COMPLETION_MODEL,
      messages,
    });

    const message: OpenAiCompletionResponse = {
      message: {
        role: result.data.choices[0].message.role,
        content: result.data.choices[0].message.content,
      },
    };

    return message;
  }
}
