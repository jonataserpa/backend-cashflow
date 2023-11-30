import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../repositories/categories.respository';
import { Categorie } from '../entities/categorie';

export interface GetByIdCategoriesRequest {
  idCategorie: number;
}

@Injectable()
export class GetByIdCategorieUseCase {
  constructor(private categorieRepository: CategoriesRepository) {}

  async execute(request: GetByIdCategoriesRequest): Promise<Categorie> {
    const { idCategorie } = request;

    const categorie = await this.categorieRepository.findById(idCategorie);

    return categorie;
  }
}
