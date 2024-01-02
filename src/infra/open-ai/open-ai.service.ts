import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OpenAiCompletionService } from './services/completion-ai.service';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { OpenAiCompletionResponse } from './models/open.ai.completion.response';

@Injectable()
export class OpenAiService {
  private readonly client: OpenAIApi;
  public completionService: any;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.client = new OpenAIApi(configuration);
    this.completionService = new OpenAiCompletionService(this.client);
  }

  async completion(
    messages: ChatCompletionRequestMessage[],
  ): Promise<OpenAiCompletionResponse> {
    try {
      const chat = await this.completionService.textCompletion(messages);
      return chat;
    } catch (e) {
      throw new InternalServerErrorException(
        'Was not possible to generate the answers',
      );
    }
  }
}
