import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Replicate from 'replicate';

@Injectable()
export class ReplicateService {
  public replicate: any;

  private readonly DEFAULT_PROMPT_MODEL =
    'anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f';

  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
    });
  }

  async video(prompt: string): Promise<string> {
    try {
      const resultVideo = await this.replicate.run(this.DEFAULT_PROMPT_MODEL, {
        input: {
          prompt,
        },
      });
      return resultVideo[0];
    } catch (e) {
      throw new InternalServerErrorException(
        'Was not possible to generate video the answers',
      );
    }
  }
}
