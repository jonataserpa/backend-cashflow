import { Company } from '../entities/company';

export interface ICompanyPropsResponse {
  data: Company[];
  headers: number;
}

export abstract class CompanysRepository {
  abstract create(user: Company): Promise<void>;
  abstract findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  }): Promise<ICompanyPropsResponse | null>;
  abstract findById(user: number): Promise<Company | null>;
  abstract update(id: number, user: Company): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
