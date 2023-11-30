import { Categorie } from '../entities/categorie';

export interface ICategoriePropsResponse {
  data: Categorie[];
  headers: number;
}

export abstract class CategoriesRepository {
  abstract create(user: Categorie): Promise<void>;
  abstract findAll(params: {
    skip?: number;
    take?: number;
    description?: string;
    title?: string;
    cover?: string;
    type?: string;
    companyId?: number;
  }): Promise<ICategoriePropsResponse | null>;
  abstract findById(idCategorie: number): Promise<Categorie | null>;
  abstract update(id: number, user: Categorie): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
