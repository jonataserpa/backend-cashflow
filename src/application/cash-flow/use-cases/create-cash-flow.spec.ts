import { CreateCashFlowUseCase } from '../../cash-flow/use-cases/create-cash-flow';
import { InMemoryCashFlowRepository } from '@test/repositories/in-memory-cash-flow-repository';

describe('Create CashFlow', () => {
  it('should be able to create a case CashFlow', async () => {
    const cashFlowRepository = new InMemoryCashFlowRepository();
    const cashFlowCreate = new CreateCashFlowUseCase(cashFlowRepository);

    const { cashFlow } = await cashFlowCreate.execute({
      id: 1,
      description: 'LUZ',
      observation: 'TEST',
      type: 'EXIT',
    });

    expect(cashFlowRepository.CashFlows).toHaveLength(1);
    expect(cashFlowRepository.CashFlows[0]).toEqual(cashFlow);
  });
});
