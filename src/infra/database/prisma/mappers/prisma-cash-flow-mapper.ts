import { TypeStatus, CashFlow as RawCashFlow } from '@prisma/client';
import { CashFlow } from '@application/cash-flow/entities/cash-flow';

export class PrismaCashFlowMapper {
  static toPrisma(cashFlow: CashFlow) {
    return {
      id: cashFlow.id,
      description: cashFlow.description,
      observation: cashFlow.observation,
      type: cashFlow.type as TypeStatus,
    };
  }

  static toDomain(raw: RawCashFlow): CashFlow {
    return new CashFlow({
      id: raw.id,
      description: raw.description,
      observation: raw.observation,
      type: raw.type,
    });
  }
}
