import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

export class OpenAiCompletionService {
  private readonly DEFAULT_COMPLETION_MODEL = 'gpt-3.5-turbo';

  constructor(private readonly service: OpenAIApi) {}

  async textCompletion(messages: ChatCompletionRequestMessage[]): Promise<any> {
    const result = await this.service.createChatCompletion({
      model: this.DEFAULT_COMPLETION_MODEL,
      messages,
    });

    return result.data.choices[0].message;
  }
}
