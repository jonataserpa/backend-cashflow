import { Injectable } from '@nestjs/common';
import { CompanysRepository } from '../repositories/company.respository';
import { Company } from '../entities/company';

export interface GetByIdCompanysRequest {
  idCompany: number;
}

@Injectable()
export class GetByIdCompanyUseCase {
  constructor(private companysRepository: CompanysRepository) {}

  async execute(request: GetByIdCompanysRequest): Promise<Company> {
    const { idCompany } = request;

    const company = await this.companysRepository.findById(idCompany);

    return company;
  }
}
