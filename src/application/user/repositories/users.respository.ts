import { User } from '../entities/user';

export interface IUserPropsResponse {
  data: User[];
  headers: number;
}

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  }): Promise<IUserPropsResponse | null>;
  abstract findById(idUser: number): Promise<User | null>;
  abstract update(id: number, user: User): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
