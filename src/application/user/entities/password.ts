export class Password {
  private readonly password: string;

  get value(): string {
    return this.password;
  }

  private validatePasswordLength(password: string): boolean {
    return password.length > 7 && password.length <= 50;
  }

  constructor(password: string) {
    const ispasswordLengthValid = this.validatePasswordLength(password);

    if (!ispasswordLengthValid) {
      throw new Error('password length error.');
    }

    this.password = password;
  }
}
