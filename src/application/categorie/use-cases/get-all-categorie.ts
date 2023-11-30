import { Injectable } from '@nestjs/common';
import {
  ICategoriePropsResponse,
  CategoriesRepository,
} from '../repositories/categories.respository';

export interface GetAllCategoriesRequest {
  params: {
    skip?: number;
    take?: number;
    description?: string;
    title?: string;
    cover?: string;
    type?: string;
    companyId?: number;
  };
}

@Injectable()
export class GetAllCategorieUseCase {
  constructor(private categorieRepository: CategoriesRepository) {}

  async execute(
    request: GetAllCategoriesRequest,
  ): Promise<ICategoriePropsResponse> {
    const { params } = request;
    const { skip, take, description, title, cover, type, companyId } = params;

    const { data, headers } = await this.categorieRepository.findAll({
      skip,
      take,
      description,
      title,
      cover,
      type,
      companyId,
    });

    return {
      data,
      headers,
    };
  }
}
