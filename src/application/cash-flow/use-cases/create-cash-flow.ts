import { Injectable } from '@nestjs/common';
import { CashFlow } from '../entities/cash-flow';
import { ICashFlowProps } from '../interfaces/cash-flow.interface';
import { CashFlowsRepository } from '../repositories/cash-flow.respository';

interface CashFlowResponse {
  cashFlow: CashFlow;
}

@Injectable()
export class CreateCashFlowUseCase {
  constructor(private cashFlowRepository: CashFlowsRepository) {}

  async execute(request: ICashFlowProps): Promise<CashFlowResponse> {
    const {
      id,
      description,
      observation,
      type,
      companyId,
      value,
      paymentedAt,
    } = request;

    const cashFlow = new CashFlow({
      id,
      description,
      observation,
      type,
      companyId,
      value,
      paymentedAt,
    });

    await this.cashFlowRepository.create(cashFlow);

    return {
      cashFlow,
    };
  }
}
