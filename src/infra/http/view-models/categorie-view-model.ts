import { Categorie } from '@application/categorie/entities/categorie';

export class CategorieViewModel {
  static toHTTP(categorie: Categorie) {
    return {
      title: categorie.title,
      uri: categorie.uri,
      description: categorie.description,
      cover: categorie.cover,
      type: categorie.type,
      companyId: categorie.companyId,
    };
  }
}
