import { CashFlow } from '../entities/cash-flow';

export interface ICashFlowPropsResponse {
  data: CashFlow[];
  headers: number;
}

export abstract class CashFlowsRepository {
  abstract create(cashFlow: CashFlow): Promise<void>;
  abstract findAll(params: {
    skip?: number;
    take?: number;
    description?: string;
    observation?: string;
    type?: string;
    paymentedAt?: string;
    createdAt?: string;
    CashFlowId?: number;
  }): Promise<ICashFlowPropsResponse | null>;
  abstract findById(cashFlow: number): Promise<CashFlow | null>;
  abstract update(id: number, cashFlow: CashFlow): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
