import { Injectable } from '@nestjs/common';
import { CompanysRepository } from '../repositories/company.respository';

export interface RemoveCompanysRequest {
  id: number;
}

@Injectable()
export class RemoveCompanyUseCase {
  constructor(private companysRepository: CompanysRepository) {}

  async execute(request: RemoveCompanysRequest): Promise<void> {
    const { id } = request;

    return await this.companysRepository.remove(id);
  }
}
