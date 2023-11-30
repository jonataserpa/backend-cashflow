import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../repositories/service.respository';

export interface RemoveServicesRequest {
  id: number;
}

@Injectable()
export class RemoveServiceUseCase {
  constructor(private serviceRepository: ServicesRepository) {}

  async execute(request: RemoveServicesRequest): Promise<void> {
    const { id } = request;

    return await this.serviceRepository.remove(id);
  }
}
