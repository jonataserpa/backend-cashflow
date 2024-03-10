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
    filter?: string;
    CashFlowId?: number;
  }): Promise<ICashFlowPropsResponse | null>;
  abstract findById(cashFlow: number): Promise<CashFlow | null>;
  abstract update(id: number, cashFlow: CashFlow): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
