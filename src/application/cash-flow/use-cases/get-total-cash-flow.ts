import { Injectable } from '@nestjs/common';
import { CashFlowsRepository } from '../repositories/cash-flow.respository';

@Injectable()
export class GetTotalCashFlowUseCase {
  constructor(private cashFlowsRepository: CashFlowsRepository) {}

  async execute(): Promise<{ sum: number; min: number; total: number }> {
    return await this.cashFlowsRepository.findTotalCashFlow();
  }
}
