import { Injectable } from '@nestjs/common';
import {
  ICompanyPropsResponse,
  CompanysRepository,
} from '../repositories/company.respository';

export interface GetAllCompanysRequest {
  params: {
    skip?: number;
    take?: number;
    filter?: string;
  };
}

@Injectable()
export class GetAllCompanyUseCase {
  constructor(private companysRepository: CompanysRepository) {}

  async execute(
    request: GetAllCompanysRequest,
  ): Promise<ICompanyPropsResponse> {
    const { params } = request;
    const { skip, take, filter } = params;

    const { data, headers } = await this.companysRepository.findAll({
      skip,
      take,
      filter,
    });

    return {
      data,
      headers,
    };
  }
}
