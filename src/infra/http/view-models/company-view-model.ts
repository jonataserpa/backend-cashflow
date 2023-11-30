import { Company } from '@application/company/entities/company';
import { CompanyStatus } from '@prisma/client';

export class CompanyViewModel {
  static toHTTP(company: Company) {
    return {
      id: company.id,
      status: company.status as CompanyStatus,
      name: company.name,
      socialReason: company.socialReason,
      url: company.url,
      cnpj: company.cnpj,
      email: company.email,
      phone: company.phone,
      cellphone: company.cellphone,
      responsible: company.responsible,
      emailResponsible: company.emailResponsible,
      followup: company.followup,
    };
  }
}
