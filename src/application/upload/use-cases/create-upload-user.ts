import { Injectable } from '@nestjs/common';
import { UploadRepository } from '../repositories/upload.respository';

export interface UploadResponse {
  file: Express.Multer.File;
  photo?: string;
}

export interface UploadUserResponse {
  file: Express.Multer.File;
}

@Injectable()
export class CreateUploadUserUseCase {
  constructor(private uploadRepository: UploadRepository) {}

  async execute(request: UploadUserResponse): Promise<UploadResponse> {
    const { file } = request;

    const { photo } = await this.uploadRepository.createUploadUser(file);

    return { file, photo } as UploadResponse;
  }
}
