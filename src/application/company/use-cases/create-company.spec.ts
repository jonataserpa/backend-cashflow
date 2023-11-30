import { CreateCompanyUseCase } from '../../company/use-cases/create-company';
import { InMemoryCompanyRepository } from '@test/repositories/in-memory-company-repository';

describe('Create Company', () => {
  it('should be able to create a case company', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const companyCreate = new CreateCompanyUseCase(companyRepository);

    const { company } = await companyCreate.execute({
      id: 1,
      status: 'ACTIVE',
      name: 'EMPRESA TEST XXXX',
      socialReason: 'XXXXXX',
      url: 'www.test.com.br',
      cnpj: '53.032.433/0001-95',
      email: 'test@gmail.com',
      phone: '(35) 99999-9999',
      cellphone: '(35) 99999-9999',
      responsible: 'John',
      emailResponsible: 'responsible@gmail.com',
      followup: 'test',
    });

    expect(companyRepository.companys).toHaveLength(1);
    expect(companyRepository.companys[0]).toEqual(company);
  });
});
