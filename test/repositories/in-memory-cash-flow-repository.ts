import { CashFlowsRepository } from '@application/cash-flow/repositories/cash-flow.respository';
import { CashFlow } from '@application/cash-flow/entities/cash-flow';
import { ICashFlowPropsResponse } from '@application/cash-flow/repositories/cash-flow.respository';

export class InMemoryCashFlowRepository implements CashFlowsRepository {
  public CashFlows: CashFlow[] = [];

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    CashFlowId?: number;
  }): Promise<ICashFlowPropsResponse> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    this.CashFlows.splice(0, id);
  }

  async findById(CashFlowId: number): Promise<CashFlow> {
    const CashFlow = this.CashFlows.find((item) => item.id === CashFlowId);

    if (!CashFlow) {
      return null;
    }

    return CashFlow;
  }

  async create(CashFlow: CashFlow) {
    this.CashFlows.push(CashFlow);
  }

  async update(id: number, CashFlow: CashFlow): Promise<void> {
    const CashFlowIndex = this.CashFlows.findIndex((item) => item.id === id);

    if (CashFlowIndex >= 0) {
      this.CashFlows[CashFlowIndex] = CashFlow;
    }
  }
}
