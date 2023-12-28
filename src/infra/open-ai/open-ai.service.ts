import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAiCompletionService } from './services/completion-ai.service';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  private readonly client: OpenAIApi;
  public completionService: any;

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.client = new OpenAIApi(configuration);
    this.completionService = new OpenAiCompletionService(this.client);
  }

  async completion(messages: ChatCompletionRequestMessage[]): Promise<any> {
    try {
      const test = await this.completionService.textCompletion(messages);
      console.log(test);
      return test;
    } catch (e) {
      throw new InternalServerErrorException(
        'Was not possible to generate the answers',
      );
    }
  }
}
