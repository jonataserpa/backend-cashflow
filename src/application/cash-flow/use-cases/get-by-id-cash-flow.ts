import { Injectable } from '@nestjs/common';
import { CashFlowsRepository } from '../repositories/cash-flow.respository';
import { CashFlow } from '../entities/cash-flow';

export interface GetByIdCashFlowsRequest {
  idCashFlow: number;
}

@Injectable()
export class GetByIdCashFlowUseCase {
  constructor(private cashFlowsRepository: CashFlowsRepository) {}

  async execute(request: GetByIdCashFlowsRequest): Promise<CashFlow> {
    const { idCashFlow } = request;

    const CashFlow = await this.cashFlowsRepository.findById(idCashFlow);

    return CashFlow;
  }
}
