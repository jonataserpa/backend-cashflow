import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '@infra/database/prisma/mappers/prisma-user-mapper';
import {
  IUserPropsResponse,
  UsersRepository,
} from '@application/user/repositories/users.respository';
import { User } from '@application/user/entities/user';
import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    try {
      await this.prisma.user.create({
        data: {
          ...raw,
          password: hashSync(raw.password, 10),
          role: 'free',
          address: {
            createMany: {
              data: raw.address,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target === 'users_email_key') {
        const erro = {
          statusCode: 403,
          name: 'Unique constraint failed on the {constraint}',
          message: 'Email ja existe!',
        };
        throw erro;
      } else if (
        error.code === 'P2002' &&
        error.meta.target === 'users_document_key'
      ) {
        const erro = {
          statusCode: 403,
          name: 'Unique constraint failed on the {constraint}',
          message: 'Usuario ja existe!',
        };
        throw erro;
      }
      throw new Error();
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  }) {
    const { skip, take, filter, companyId } = params;
    let listUsers;
    const newUsers = [];

    if (isNaN(skip) && isNaN(take) && isNaN(companyId)) {
      listUsers = await this.prisma.user.findMany({
        where: {
          deletedAt: null,
          companyId: 1,
          AND: {
            deletedAt: null,
          },
        },
        include: {
          company: true,
          address: true,
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else if (isNaN(skip) && isNaN(take)) {
      listUsers = await this.prisma.user.findMany({
        where: {
          deletedAt: null,
          AND: {
            companyId: isNaN(companyId) ? 1 : companyId,
            deletedAt: null,
          },
        },
        include: {
          company: true,
          address: true,
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else {
      listUsers = await this.prisma.user.findMany({
        skip,
        take,
        where: {
          firstName: {
            contains: filter,
          },
          AND: {
            companyId: isNaN(companyId) ? 1 : companyId,
            deletedAt: null,
          },
        },
        include: {
          company: true,
          address: true,
        },
        orderBy: {
          id: 'desc',
        },
      });
    }

    listUsers.map((user) => {
      const { password: _, ...data } = user;
      newUsers.push(data);
    });

    const dataUsers: IUserPropsResponse = {
      data: newUsers,
      headers: newUsers.length === 1 ? 1 : newUsers.length,
    };
    return dataUsers;
  }

  async findById(userId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        company: true,
        address: true,
      },
    });

    if (!user) {
      return null;
    }

    return new User({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      genre: user.genre,
      dateBorn: user.dateBorn,
      documentType: user.documentType,
      document: user.document,
      image: user.image,
      photo: user.photo,
      business: user.business,
      companyId: user.companyId,
      address: user.address,
    });
  }

  async update(id: number, user: User): Promise<void> {
    const userUpdate = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        company: true,
      },
    });

    if (!userUpdate) {
      throw new Error(`user ${id} does not exist`);
    }

    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        firstName: raw.firstName,
        lastName: raw.lastName,
        phone: raw.phone,
        email: raw.email,
        genre: raw.genre,
        dateBorn: raw.dateBorn,
        documentType: raw.documentType,
        document: raw.document,
        image: raw.image,
        photo: raw.photo,
        business: raw.business,
      },
    });

    if (user?.address && user?.address.length > 0) {
      await this.prisma.$transaction(
        raw.address?.map((addr) =>
          this.prisma.address?.upsert({
            update: {
              id: addr?.id,
              address: addr.address,
              number: addr.number,
              complement: addr.complement,
              district: addr.district,
              city: addr.city,
              state: addr.state,
              country: addr.country,
              zipcode: addr.zipcode,
            },
            create: { ...addr, userId: user.id },
            where: { id: addr?.id || 0 },
          }),
        ),
      );
    }
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new Error(`user does not exist`);
    }

    await this.prisma.user.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id: Number(id) },
    });
  }
}
