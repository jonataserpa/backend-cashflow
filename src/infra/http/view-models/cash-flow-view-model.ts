import { CashFlow } from '@application/cash-flow/entities/cash-flow';
import { TypeStatus } from '@prisma/client';

export class CashFlowViewModel {
  static toHTTP(cashFlow: CashFlow) {
    return {
      id: cashFlow.id,
      type: cashFlow.type as TypeStatus,
      observation: cashFlow.observation,
      description: cashFlow.description,
    };
  }
}
