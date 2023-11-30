import { Service } from '@application/service/entities/service';

export class ServiceViewModel {
  static toHTTP(service: Service) {
    return {
      name: service.name,
      status: service.status,
    };
  }
}
