import { Service } from '../entities/service';

export interface IServicePropsResponse {
  data: Service[];
  headers: number;
}

export abstract class ServicesRepository {
  abstract create(user: Service): Promise<void>;
  abstract findAll(params: {
    skip?: number;
    take?: number;
    name?: string;
    status?: string;
  }): Promise<IServicePropsResponse | null>;
  abstract findById(idService: number): Promise<Service | null>;
  abstract update(id: number, user: Service): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
