export interface Address {
  id?: number;
  address: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
}

export interface IUserProps {
  id?: number;
  firstName: string;
  lastName?: string;
  phone?: string;
  email: string;
  genre?: string;
  dateBorn: Date;
  documentType?: string;
  document: string;
  photo?: string;
  business?: string;
  password?: string;
  token?: string;
  companyId: number;
  address?: Address[];
  image?: string;
}
