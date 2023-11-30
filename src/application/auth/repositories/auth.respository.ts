export interface IAuthPropsResponse {
  token: string;
  user: {
    id: number;
    name: string;
    companyId: number;
    email: string;
  };
}

export abstract class AuthRepository {
  abstract login(
    username: string,
    password: string,
  ): Promise<IAuthPropsResponse>;
  abstract validateCredentials(username: string, password: string);
}
