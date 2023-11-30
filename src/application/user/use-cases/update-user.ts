import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { IUserProps } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.respository';

interface UserResponse {
  user: User;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: IUserProps): Promise<UserResponse> {
    const {
      id,
      firstName,
      lastName,
      phone,
      email,
      genre,
      dateBorn,
      documentType,
      document,
      photo,
      business,
      password,
      companyId,
      address,
      image,
    } = request;

    const user = new User({
      id,
      firstName,
      lastName,
      phone,
      email,
      genre,
      dateBorn,
      documentType,
      document,
      photo,
      business,
      password,
      companyId,
      address,
      image,
    });

    await this.usersRepository.update(id, user);

    return {
      user,
    };
  }
}
