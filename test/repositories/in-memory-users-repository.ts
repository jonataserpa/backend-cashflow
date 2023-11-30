import { User } from '@application/user/entities/user';
import {
  IUserPropsResponse,
  UsersRepository,
} from '@application/user/repositories/users.respository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  }): Promise<IUserPropsResponse> {
    throw new Error('Method not implemented.');
  }

  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(userId: number): Promise<User | null> {
    const user = this.users.find((item) => item.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User) {
    this.users.push(user);
  }

  async update(id: number, user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
