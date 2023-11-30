import { Categories as RawCategorie } from '@prisma/client';
import { Categorie } from '@application/categorie/entities/categorie';

export class PrismaCategorieMapper {
  static toPrisma(categorie: Categorie) {
    return {
      id: Number(categorie.id) ? Number(categorie.id) : categorie.id,
      title: categorie.title,
      uri: categorie.uri,
      description: categorie.description,
      cover: categorie.cover,
      type: categorie.type,
      companyId: categorie.companyId,
    };
  }

  static toDomain(raw: RawCategorie): Categorie {
    return new Categorie({
      id: raw.id,
      title: raw.title,
      uri: raw.uri,
      description: raw.description,
      cover: raw.cover,
      type: raw.type,
      companyId: raw.companyId,
    });
  }
}
