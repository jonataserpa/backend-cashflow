import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CreateUserUseCase } from './create-user';

describe('Create User', () => {
  it('should be able to create a case user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const userCreate = new CreateUserUseCase(usersRepository);

    const { user } = await userCreate.execute({
      id: 1,
      firstName: 'Jonata',
      lastName: 'Serpa',
      phone: '(35) 99743-3853',
      email: 'jonataserpa@gmail.com',
      genre: 'mas',
      dateBorn: new Date(),
      documentType: 'CPF',
      document: '123-456-789-99',
      photo: '',
      business: 'dev',
      password: '12345678',
      companyId: 1,
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });
});
