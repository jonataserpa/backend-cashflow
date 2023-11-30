import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { IUserProps } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.respository';

interface UserResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: IUserProps): Promise<UserResponse> {
    const {
      firstName,
      lastName,
      phone,
      email,
      genre,
      dateBorn,
      documentType,
      document,
      business,
      password,
      companyId,
      address,
      image,
      photo,
    } = request;

    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      genre,
      dateBorn,
      documentType,
      document,
      business,
      password,
      companyId,
      address,
      image,
      photo,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
