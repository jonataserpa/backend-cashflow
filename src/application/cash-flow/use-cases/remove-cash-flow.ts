import { Injectable } from '@nestjs/common';
import { CashFlowsRepository } from '../repositories/cash-flow.respository';

export interface RemoveCashFlowsRequest {
  id: number;
}

@Injectable()
export class RemoveCashFlowUseCase {
  constructor(private cashFlowsRepository: CashFlowsRepository) {}

  async execute(request: RemoveCashFlowsRequest): Promise<void> {
    const { id } = request;

    return await this.cashFlowsRepository.remove(id);
  }
}
