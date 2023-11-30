import { PrismaService } from '../prisma.service';
import { PrismaCategorieMapper } from '@infra/database/prisma/mappers/prisma-categorie-mapper';
import {
  ICategoriePropsResponse,
  CategoriesRepository,
} from '@application/categorie/repositories/categories.respository';
import { Categorie } from '@application/categorie/entities/categorie';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(categorie: Categorie): Promise<void> {
    const raw = PrismaCategorieMapper.toPrisma(categorie);

    await this.prisma.categories.create({
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
      data = await this.prisma.categories.findMany({
        where: {
          deletedAt: null,
          companyId: 1,
          ...options,
          AND: {
            deletedAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else if (isNaN(skip) && isNaN(take)) {
      data = await this.prisma.categories.findMany({
        where: {
          deletedAt: null,
          AND: {
            companyId: isNaN(companyId) ? 1 : companyId,
            deletedAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else {
      data = await this.prisma.categories.findMany({
        skip,
        take,
        where: {
          ...options,
          AND: {
            companyId: isNaN(companyId) ? 1 : companyId,
            deletedAt: null,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    }

    const dataCategories: ICategoriePropsResponse = {
      data,
      headers: data.length === 1 ? 1 : data.length,
    };
    return dataCategories;
  }

  async findById(userId: number): Promise<Categorie | null> {
    const user = await this.prisma.categories.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return null;
    }

    return PrismaCategorieMapper.toDomain(user);
  }

  async update(id: number, categorie: Categorie): Promise<void> {
    const userUpdate = await this.prisma.categories.findUnique({
      where: { id: Number(id) },
      include: {
        company: true,
      },
    });

    if (!userUpdate) {
      throw new Error(`categorie ${id} does not exist`);
    }

    const raw = PrismaCategorieMapper.toPrisma(categorie);

    await this.prisma.categories.update({
      where: {
        id: Number(id),
      },
      data: raw,
    });
  }

  async remove(id: number) {
    const categorie = await this.prisma.categories.findUnique({
      where: { id: Number(id) },
    });

    if (!categorie) {
      throw new Error(`categorie does not exist`);
    }

    await this.prisma.categories.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id: Number(id) },
    });
  }
}
