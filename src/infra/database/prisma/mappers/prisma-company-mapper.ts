import { CompanyStatus, Company as RawCompany } from '@prisma/client';
import { Company } from '@application/company/entities/company';

export class PrismaCompanyMapper {
  static toPrisma(company: Company) {
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

  static toDomain(raw: RawCompany): Company {
    return new Company({
      id: raw.id,
      status: raw.status,
      name: raw.name,
      socialReason: raw.socialReason,
      url: raw.url,
      cnpj: raw.cnpj,
      email: raw.email,
      phone: raw.phone,
      cellphone: raw.cellphone,
      responsible: raw.responsible,
      emailResponsible: raw.emailResponsible,
      followup: raw.followup,
    });
  }
}
