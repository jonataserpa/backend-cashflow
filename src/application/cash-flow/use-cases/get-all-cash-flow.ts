import { Injectable } from '@nestjs/common';
import {
  ICashFlowPropsResponse,
  CashFlowsRepository,
} from '../repositories/cash-flow.respository';

export interface GetAllCashFlowsRequest {
  params: {
    skip?: number;
    take?: number;
    filter?: string;
  };
}

@Injectable()
export class GetAllCashFlowUseCase {
  constructor(private cashFlowsRepository: CashFlowsRepository) {}

  async execute(
    request: GetAllCashFlowsRequest,
  ): Promise<ICashFlowPropsResponse> {
    const { params } = request;
    const { skip, take, filter } = params;

    const { data, headers } = await this.cashFlowsRepository.findAll({
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
