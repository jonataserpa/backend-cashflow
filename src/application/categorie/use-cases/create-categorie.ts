import { Injectable } from '@nestjs/common';
import { Categorie } from '../entities/categorie';
import { ICategorieProps } from '../interfaces/categorie.interface';
import { CategoriesRepository } from '../repositories/categories.respository';

interface CategorieResponse {
  categorie: Categorie;
}

@Injectable()
export class CreateCategorieUseCase {
  constructor(private categorieRepository: CategoriesRepository) {}

  async execute(request: ICategorieProps): Promise<CategorieResponse> {
    const { title, uri, description, cover, type, companyId } = request;

    const categorie = new Categorie({
      title,
      uri,
      description,
      cover,
      type,
      companyId,
    });

    await this.categorieRepository.create(categorie);

    return {
      categorie,
    };
  }
}
