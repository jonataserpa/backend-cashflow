import { Injectable } from '@nestjs/common';
import {
  IServicePropsResponse,
  ServicesRepository,
} from '../repositories/service.respository';

export interface GetAllServicesRequest {
  params: {
    skip?: number;
    take?: number;
    name?: string;
    status?: string;
  };
}

@Injectable()
export class GetAllServiceUseCase {
  constructor(private serviceRepository: ServicesRepository) {}

  async execute(
    request: GetAllServicesRequest,
  ): Promise<IServicePropsResponse> {
    const { params } = request;
    const { skip, take, name, status } = params;

    const { data, headers } = await this.serviceRepository.findAll({
      skip,
      take,
      name,
      status,
    });

    return {
      data,
      headers,
    };
  }
}
