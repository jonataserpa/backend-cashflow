import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../repositories/service.respository';
import { Service } from '../entities/service';

export interface GetByIdServicesRequest {
  idService: number;
}

@Injectable()
export class GetByIdServiceUseCase {
  constructor(private serviceRepository: ServicesRepository) {}

  async execute(request: GetByIdServicesRequest): Promise<Service> {
    const { idService } = request;

    const Service = await this.serviceRepository.findById(idService);

    return Service;
  }
}
