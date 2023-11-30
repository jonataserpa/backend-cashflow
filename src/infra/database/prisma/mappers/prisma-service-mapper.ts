import { Service as RawService } from '@prisma/client';
import { Service } from '@application/service/entities/service';

export class PrismaServiceMapper {
  static toPrisma(service: Service) {
    return {
      id: Number(service.id) ? Number(service.id) : service.id,
      name: service.name,
      status: service.status,
    };
  }

  static toDomain(raw: RawService): Service {
    return new Service({
      id: Number(raw.id),
      name: raw.name,
      status: raw.status,
    });
  }
}
