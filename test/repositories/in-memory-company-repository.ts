import { Company } from '@application/company/entities/company';
import {
  CompanysRepository,
  ICompanyPropsResponse,
} from '@application/company/repositories/company.respository';

export class InMemoryCompanyRepository implements CompanysRepository {
  public companys: Company[] = [];

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  }): Promise<ICompanyPropsResponse> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    this.companys.splice(0, id);
  }

  async findById(companyId: number): Promise<Company> {
    const company = this.companys.find((item) => item.id === companyId);

    if (!company) {
      return null;
    }

    return company;
  }

  async create(company: Company) {
    this.companys.push(company);
  }

  async update(id: number, company: Company): Promise<void> {
    const companyIndex = this.companys.findIndex((item) => item.id === id);

    if (companyIndex >= 0) {
      this.companys[companyIndex] = company;
    }
  }
}
