import { User as RawUser } from '@prisma/client';
import { User } from '@application/user/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: Number(user.id) ? Number(user.id) : user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      genre: user.genre,
      dateBorn: user.dateBorn,
      documentType: user.documentType,
      document: user.document,
      photo: user.photo,
      business: user.business,
      password: user.password,
      companyId: user.companyId,
      address: user.address,
      image: user.image,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User({
      id: raw.id,
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      genre: raw.genre,
      dateBorn: raw.dateBorn,
      documentType: raw.documentType,
      document: raw.document,
      image: raw.image,
      business: raw.business,
      companyId: raw.companyId,
      photo: raw.photo,

      // address: raw.address,
    });
  }
}
