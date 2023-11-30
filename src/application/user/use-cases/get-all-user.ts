import { Injectable } from '@nestjs/common';
import {
  IUserPropsResponse,
  UsersRepository,
} from '../repositories/users.respository';

export interface GetAllUsersRequest {
  params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  };
}

@Injectable()
export class GetAllUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: GetAllUsersRequest): Promise<IUserPropsResponse> {
    const { params } = request;
    const { skip, take, filter, companyId } = params;

    const { data, headers } = await this.usersRepository.findAll({
      skip,
      take,
      filter,
      companyId,
    });

    return {
      data,
      headers,
    };
  }
}
