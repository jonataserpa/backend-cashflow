import { Password } from './password';
import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const pass = new Password('12345678');
    const user = new User({
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
      password: pass.value,
      companyId: 1,
    });

    expect(user).toBeTruthy();
  });
});
