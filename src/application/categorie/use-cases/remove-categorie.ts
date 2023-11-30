import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../repositories/categories.respository';

export interface RemoveCategoriesRequest {
  id: number;
}

@Injectable()
export class RemoveCategorieUseCase {
  constructor(private categorieRepository: CategoriesRepository) {}

  async execute(request: RemoveCategoriesRequest): Promise<void> {
    const { id } = request;

    return await this.categorieRepository.remove(id);
  }
}
