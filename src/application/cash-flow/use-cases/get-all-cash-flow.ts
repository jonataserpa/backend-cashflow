import { Injectable } from '@nestjs/common';
import {
  ICashFlowPropsResponse,
  CashFlowsRepository,
} from '../repositories/cash-flow.respository';

export interface GetAllCashFlowsRequest {
  params: {
    skip?: number;
    take?: number;
    description?: string;
    observation?: string;
    type?: string;
    paymentedAt?: string;
    createdAt?: string;
  };
}

@Injectable()
export class GetAllCashFlowUseCase {
  constructor(private cashFlowsRepository: CashFlowsRepository) {}

  async execute(
    request: GetAllCashFlowsRequest,
  ): Promise<ICashFlowPropsResponse> {
    const { params } = request;
    const {
      skip,
      take,
      description,
      observation,
      type,
      paymentedAt,
      createdAt,
    } = params;

    const { data, headers } = await this.cashFlowsRepository.findAll({
      skip,
      take,
      description,
      observation,
      type,
      paymentedAt,
      createdAt,
    });

    return {
      data,
      headers,
    };
  }
}
