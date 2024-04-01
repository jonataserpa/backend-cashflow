import { PrismaService } from '../prisma.service';
import { PrismaCashFlowMapper } from '@infra/database/prisma/mappers/prisma-cash-flow-mapper';
import {
  ICashFlowPropsResponse,
  CashFlowsRepository,
} from '@application/cash-flow/repositories/cash-flow.respository';
import { CashFlow } from '@application/cash-flow/entities/cash-flow';
import { Injectable } from '@nestjs/common';
import { TypeStatus } from '@prisma/client';

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
    description?: string;
    observation?: string;
    type?: string;
    paymentedAt?: string;
    createdAt?: string;
    cashFlowId?: number;
  }) {
    const {
      skip,
      take,
      description,
      observation,
      type,
      paymentedAt,
      createdAt,
      cashFlowId: id,
    } = params;
    let data;
    console.log('paymentedAt:: ', paymentedAt);

    const options = {
      description: {
        contains: description,
      },
      observation: {
        contains: observation,
      },
      type: {
        in: type as TypeStatus,
      },
      paymentedAt: {
        gte: paymentedAt ? new Date(paymentedAt) : undefined,
        lte: paymentedAt ? new Date(paymentedAt) : undefined,
      },
      createdAt: {
        gte: paymentedAt ? new Date(createdAt) : undefined,
        lte: paymentedAt ? new Date(createdAt) : undefined,
      },
    };

    if (isNaN(skip)) {
      data = await this.prisma.cashFlow.findMany({
        where: {
          ...options,
          id,
          AND: {
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
          ...options,
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

    const totalCash = await this.prisma.cashFlow.findMany({
      where: {
        AND: {
          id,
          deletedAt: null,
        },
      },
    });

    const dataCashFlows: ICashFlowPropsResponse = {
      data,
      headers: totalCash.length === 1 ? 1 : totalCash.length,
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
    const cash = await this.prisma.cashFlow.findUnique({
      where: { id },
    });

    if (!cash) {
      throw new Error(`CashFlow does not exist`);
    }

    await this.prisma.cashFlow.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id },
    });
  }

  addPointBeforeTwoLastDigits(numero) {
    // Converte o número para string, caso ainda não seja
    const numeroComoString = numero.toString();
    // Usa regex para encontrar os componentes da string e inserir um ponto
    // O padrão captura qualquer coisa até os dois últimos dígitos (\d{2}) no final da string ($)
    // e os substitui pelo grupo capturado seguido de um ponto e os dois últimos dígitos
    const resultado = numeroComoString.replace(/(\d+)(\d{2})$/, '$1.$2');
    return resultado;
  }

  async findTotalCashFlow() {
    const cashFlows = await this.prisma.cashFlow.findMany({
      select: {
        value: true,
        type: true,
      },
    });

    if (!cashFlows) {
      throw new Error(`CashFlow does not exist`);
    }

    const totalSum = cashFlows.reduce((acc, current) => {
      if (current.type === 'ENTRY') {
        acc += Number(
          current.value.replace('R$ ', '').replace(',', '').replace('.', ''),
        );
      }
      return acc;
    }, 0);

    const totalMin = cashFlows.reduce((acc, current) => {
      if (current.type === 'EXIT') {
        acc += Number(
          current.value.replace('R$ ', '').replace(',', '').replace('.', ''),
        );
      }
      return acc;
    }, 0);

    const total = totalSum - totalMin;

    return {
      sum: this.addPointBeforeTwoLastDigits(totalSum),
      min: this.addPointBeforeTwoLastDigits(totalMin),
      total: this.addPointBeforeTwoLastDigits(total),
    };
  }
}
