import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Video } from '@application/video/entities/video';
import { VideoRepository } from '@application/video/repositories/video-repository';
import { ReplicateService } from '@infra/replicate-ai/replicate.service';

@Injectable()
export class PrismaVideoRepository implements VideoRepository {
  constructor(
    private prisma: PrismaService,
    private prompt: ReplicateService,
  ) {}

  async create(video: Video): Promise<string> {
    const prompt = video.prompt;

    const result = await this.prompt.video(prompt);

    await this.prisma.chat.create({
      data: {
        message: video.prompt,
        response: result,
        type: 2,
      },
    });

    return result;
  }
}
