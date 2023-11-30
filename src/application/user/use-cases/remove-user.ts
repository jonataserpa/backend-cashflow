import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.respository';

export interface RemoveUsersRequest {
  id: number;
}

@Injectable()
export class RemoveUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: RemoveUsersRequest): Promise<void> {
    const { id } = request;

    return await this.usersRepository.remove(id);
  }
}
