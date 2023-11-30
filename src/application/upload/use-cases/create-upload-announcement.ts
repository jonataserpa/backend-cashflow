import { Injectable } from '@nestjs/common';
import { IUploadProps } from '../interfaces/upload.interface';
import { UploadRepository } from '../repositories/upload.respository';

export interface UploadResponse {
  file: Express.Multer.File;
}

@Injectable()
export class CreateUploadUseCase {
  constructor(private uploadRepository: UploadRepository) {}

  async execute(request: IUploadProps): Promise<UploadResponse> {
    const { file, id } = request;

    await this.uploadRepository.create(file, id);

    return { file, id } as UploadResponse;
  }
}
