import { Categorie } from '@application/categorie/entities/categorie';
import {
  CategoriesRepository,
  ICategoriePropsResponse,
} from '@application/categorie/repositories/categories.respository';

export class InMemoryCategorieRepository implements CategoriesRepository {
  public categories: Categorie[] = [];

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  }): Promise<ICategoriePropsResponse> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    this.categories.splice(0, id);
  }

  async findById(categorieId: number): Promise<Categorie> {
    const categorie = this.categories.find((item) => item.id === categorieId);

    if (!categorie) {
      return null;
    }

    return categorie;
  }

  async create(categorie: Categorie) {
    this.categories.push(categorie);
  }

  async update(id: number, categorie: Categorie): Promise<void> {
    const categorieIndex = this.categories.findIndex((item) => item.id === id);

    if (categorieIndex >= 0) {
      this.categories[categorieIndex] = categorie;
    }
  }
}
