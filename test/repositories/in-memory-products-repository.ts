import { Product } from '@application/product/entities/product';
import {
  IProductPropsResponse,
  ProductsRepository,
} from '@application/product/repositories/products.respository';

export class InMemoryProductRepository implements ProductsRepository {
  public products: Product[] = [];

  async findAll(params: {
    skip?: number;
    take?: number;
    filter?: string;
    companyId?: number;
  }): Promise<IProductPropsResponse> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    this.products.splice(0, id);
  }

  async findById(productId: number): Promise<Product | null> {
    const product = this.products.find((item) => item.id === productId);

    if (!product) {
      return null;
    }

    return product;
  }

  async create(user: Product) {
    this.products.push(user);
  }

  async update(id: number, user: Product): Promise<void> {
    const userIndex = this.products.findIndex((item) => item.id === id);

    if (userIndex >= 0) {
      this.products[userIndex] = user;
    }
  }
}
