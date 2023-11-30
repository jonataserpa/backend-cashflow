import { Injectable } from '@nestjs/common';
import { Service } from '../entities/service';
import { IServiceProps } from '../interfaces/service.interface';
import { ServicesRepository } from '../repositories/service.respository';

interface ServiceResponse {
  service: Service;
}

@Injectable()
export class UpdateServiceUseCase {
  constructor(private serviceRepository: ServicesRepository) {}

  async execute(request: IServiceProps): Promise<ServiceResponse> {
    const { id, name, status } = request;

    const service = new Service({
      id,
      name,
      status,
    });

    await this.serviceRepository.update(id, service);

    return {
      service,
    };
  }
}
