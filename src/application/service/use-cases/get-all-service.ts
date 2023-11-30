import { Injectable } from '@nestjs/common';
import {
  IServicePropsResponse,
  ServicesRepository,
} from '../repositories/service.respository';

export interface GetAllServicesRequest {
  params: {
    skip?: number;
    take?: number;
    description?: string;
    title?: string;
    cover?: string;
    type?: string;
    companyId?: number;
  };
}

@Injectable()
export class GetAllServiceUseCase {
  constructor(private serviceRepository: ServicesRepository) {}

  async execute(
    request: GetAllServicesRequest,
  ): Promise<IServicePropsResponse> {
    const { params } = request;
    const { skip, take, description, title, cover, type, companyId } = params;

    const { data, headers } = await this.serviceRepository.findAll({
      skip,
      take,
      description,
      title,
      cover,
      type,
      companyId,
    });

    return {
      data,
      headers,
    };
  }
}
