import { Injectable } from '@nestjs/common';
import { Service } from '../entities/service';
import { IServiceProps } from '../interfaces/service.interface';
import { ServicesRepository } from '../repositories/service.respository';

interface ServiceResponse {
  service: Service;
}

@Injectable()
export class CreateServiceUseCase {
  constructor(private serviceRepository: ServicesRepository) {}

  async execute(request: IServiceProps): Promise<ServiceResponse> {
    const { name, status } = request;

    const service = new Service({
      name,
      status,
    });

    await this.serviceRepository.create(service);

    return {
      service,
    };
  }
}
