export interface IUser {
  photo: string;
}

export abstract class UploadRepository {
  abstract create(file: Express.Multer.File, id: number): Promise<void>;
  abstract createUploadUser(file: Express.Multer.File): Promise<IUser>;
  abstract createUploadProduct(file: Express.Multer.File): Promise<IUser>;
  abstract remove(id: number): Promise<void>;
  // abstract download(name: string): Promise<any>;
}
