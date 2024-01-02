import { Video } from '../entities/video';

export abstract class VideoRepository {
  abstract create(video: Video): Promise<string>;
}
