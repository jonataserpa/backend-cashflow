import { PrismaService } from '../prisma.service';
import { PrismaServiceMapper } from '@infra/database/prisma/mappers/prisma-service-mapper';
import {
  IServicePropsResponse,
  ServicesRepository,
} from '@application/service/repositories/service.respository';
import { Service } from '@application/service/entities/service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaServicesRepository implements ServicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(service: Service): Promise<void> {
    const raw = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.create({
      data: raw,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    description?: string;
    title?: string;
    cover?: string;
    type?: string;
    companyId?: number;
  }) {
    const { skip, take, description, title, cover, type, companyId } = params;
    let data;

    const options = {
      description: {
        contains: description,
      },
      title: {
        contains: title,
      },
      cover: {
        contains: cover,
      },
      type: {
        contains: type,
      },
    };

    if (isNaN(skip) && isNaN(take) && isNaN(companyId)) {
      data = await this.prisma.service.findMany({
        where: {
          ...options,
          AND: {
            deleteAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else if (isNaN(skip) && isNaN(take)) {
      data = await this.prisma.service.findMany({
        where: {
          AND: {
            deleteAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else {
      data = await this.prisma.service.findMany({
        skip,
        take,
        where: {
          ...options,
          AND: {
            deleteAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    }

    const dataServices: IServicePropsResponse = {
      data,
      headers: data.length === 1 ? 1 : data.length,
    };
    return dataServices;
  }

  async findById(userId: number): Promise<Service | null> {
    const user = await this.prisma.service.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return null;
    }

    return PrismaServiceMapper.toDomain(user);
  }

  async update(id: number, service: Service): Promise<void> {
    const userUpdate = await this.prisma.service.findUnique({
      where: { id: Number(id) },
    });

    if (!userUpdate) {
      throw new Error(`service ${id} does not exist`);
    }

    const raw = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.update({
      where: {
        id: Number(id),
      },
      data: raw,
    });
  }

  async remove(id: number) {
    const service = await this.prisma.service.findUnique({
      where: { id: Number(id) },
    });

    if (!service) {
      throw new Error(`service does not exist`);
    }

    await this.prisma.service.update({
      data: {
        deleteAt: new Date(),
      },
      where: { id: Number(id) },
    });
  }
}
