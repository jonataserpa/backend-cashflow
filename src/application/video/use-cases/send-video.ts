import { Injectable } from '@nestjs/common';
import { Video } from '../entities/video';
import { VideoRepository } from '../repositories/video-repository';

interface SendVideoRequest {
  prompt: string;
}

interface SendVideoResponse {
  resultVideo: string;
}

@Injectable()
export class SendVideoUseCase {
  constructor(private videoRepository: VideoRepository) {}

  async execute(request: SendVideoRequest): Promise<SendVideoResponse> {
    const { prompt } = request;

    const video = new Video({
      prompt,
    });

    const resultVideo = await this.videoRepository.create(video);

    return {
      resultVideo,
    };
  }
}
