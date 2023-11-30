import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company';
import { ICompanyProps } from '../interfaces/company.interface';
import { CompanysRepository } from '../repositories/company.respository';

interface CompanyResponse {
  company: Company;
}

@Injectable()
export class UpdateCompanyUseCase {
  constructor(private companysRepository: CompanysRepository) {}

  async execute(request: ICompanyProps): Promise<CompanyResponse> {
    const {
      id,
      status,
      name,
      socialReason,
      url,
      cnpj,
      email,
      phone,
      cellphone,
      responsible,
      emailResponsible,
      followup,
    } = request;

    const company = new Company({
      id,
      status,
      name,
      socialReason,
      url,
      cnpj,
      email,
      phone,
      cellphone,
      responsible,
      emailResponsible,
      followup,
    });

    await this.companysRepository.update(id, company);

    return {
      company,
    };
  }
}
