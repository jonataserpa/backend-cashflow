import { User } from '@application/user/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
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
      address: user.address,
      image: user.image,
    };
  }
}
