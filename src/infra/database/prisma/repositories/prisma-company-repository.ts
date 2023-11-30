import { PrismaService } from '../prisma.service';
import { PrismaCompanyMapper } from '@infra/database/prisma/mappers/prisma-company-mapper';
import {
  ICompanyPropsResponse,
  CompanysRepository,
} from '@application/company/repositories/company.respository';
import { Company } from '@application/company/entities/company';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCompanysRepository implements CompanysRepository {
  constructor(private prisma: PrismaService) {}

  async create(company: Company): Promise<void> {
    const raw = PrismaCompanyMapper.toPrisma(company);

    await this.prisma.company.create({
      data: raw,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  }) {
    const { skip, take, filter, companyId: id } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.company.findMany({
        where: {
          deleteAt: null,
          AND: {
            id,
            deleteAt: null,
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else {
      data = await this.prisma.company.findMany({
        skip,
        take,
        where: {
          name: {
            contains: filter,
          },
          AND: {
            id,
            deleteAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    }

    const dataCompanys: ICompanyPropsResponse = {
      data,
      headers: data.length === 1 ? 1 : data.length - 1,
    };
    return dataCompanys;
  }

  async findById(id: number): Promise<Company | null> {
    const user = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaCompanyMapper.toDomain(user);
  }

  async update(id: number, company: Company): Promise<void> {
    const raw = PrismaCompanyMapper.toPrisma(company);

    await this.prisma.company.update({
      where: {
        id,
      },
      data: raw,
    });
  }

  async remove(id: number) {
    const narrative = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!narrative) {
      throw new Error(`company does not exist`);
    }

    await this.prisma.company.update({
      data: {
        deleteAt: new Date(),
      },
      where: { id },
    });
  }
}
