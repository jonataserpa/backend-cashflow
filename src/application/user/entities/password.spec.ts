import { Password } from './password';

describe('Password', () => {
  it('should be able to create a user', () => {
    const user = new Password('123456789');
    expect(user).toBeTruthy();
  });

  it('should not be able to create a user passaword with less than 8 characteres', () => {
    expect(() => new Password('1234')).toThrow();
  });

  it('should not be able to create a user passaword more less than 50 characteres', () => {
    expect(() => new Password('1'.repeat(51))).toThrow();
  });
});
