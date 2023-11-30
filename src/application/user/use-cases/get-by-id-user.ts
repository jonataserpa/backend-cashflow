import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.respository';
import { User } from '../entities/user';

export interface GetByIdUsersRequest {
  idUser: number;
}

@Injectable()
export class GetByIdUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: GetByIdUsersRequest): Promise<User> {
    const { idUser } = request;

    const user = await this.usersRepository.findById(idUser);

    return user;
  }
}
