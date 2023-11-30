import { Injectable } from '@nestjs/common';
import { IUploadProps } from '../interfaces/upload.interface';
import { UploadRepository } from '../repositories/upload.respository';

@Injectable()
export class RemoveUploadUseCase {
  constructor(private uploadRepository: UploadRepository) {}

  async execute(request: IUploadProps): Promise<void> {
    const { id } = request;

    await this.uploadRepository.remove(id);
  }
}
