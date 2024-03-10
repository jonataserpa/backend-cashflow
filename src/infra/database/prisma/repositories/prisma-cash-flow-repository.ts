import { PrismaService } from '../prisma.service';
import { PrismaCashFlowMapper } from '@infra/database/prisma/mappers/prisma-cash-flow-mapper';
import {
  ICashFlowPropsResponse,
  CashFlowsRepository,
} from '@application/cash-flow/repositories/cash-flow.respository';
import { CashFlow } from '@application/cash-flow/entities/cash-flow';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCashFlowsRepository implements CashFlowsRepository {
  constructor(private prisma: PrismaService) {}

  async create(cashFlow: CashFlow): Promise<void> {
    const raw = PrismaCashFlowMapper.toPrisma(cashFlow);

    await this.prisma.cashFlow.create({
      data: {
        description: raw.description,
        observation: raw.observation,
        type: raw.type,
        companyId: raw.companyId,
        value: raw.value,
        paymentedAt: raw.paymentedAt,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    cashFlowId?: number;
  }) {
    const { skip, take, filter, cashFlowId: id } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.cashFlow.findMany({
        where: {
          AND: {
            id,
            deletedAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else {
      data = await this.prisma.cashFlow.findMany({
        skip,
        take,
        where: {
          description: {
            contains: filter,
          },
          AND: {
            id,
            deletedAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    }

    const dataCashFlows: ICashFlowPropsResponse = {
      data,
      headers: data.length === 1 ? 1 : data.length,
    };
    return dataCashFlows;
  }

  async findById(id: number): Promise<CashFlow | null> {
    const cash = await this.prisma.cashFlow.findUnique({
      where: {
        id,
      },
    });

    if (!cash) {
      return null;
    }

    return PrismaCashFlowMapper.toDomain(cash);
  }

  async update(id: number, cashFlow: CashFlow): Promise<void> {
    const raw = PrismaCashFlowMapper.toPrisma(cashFlow);

    await this.prisma.cashFlow.update({
      where: {
        id,
      },
      data: raw,
    });
  }

  async remove(id: number) {
    const narrative = await this.prisma.cashFlow.findUnique({
      where: { id },
    });

    if (!narrative) {
      throw new Error(`CashFlow does not exist`);
    }

    await this.prisma.cashFlow.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id },
    });
  }
}
