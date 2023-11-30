import { Address, IUserProps } from '../interfaces/user.interface';
import { Password } from './password';

export class User {
  private props: IUserProps;

  constructor(props: IUserProps) {
    this.props = {
      ...props,
    };
  }

  public set id(id: number) {
    this.props.id = id;
  }

  public get id(): number {
    return this.props.id;
  }

  public set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  public get lastName(): string | undefined {
    return this.props.lastName;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string | undefined {
    return this.props.phone;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set genre(genre: string) {
    this.props.genre = genre;
  }

  public get genre(): string | undefined {
    return this.props.genre;
  }

  public set dateBorn(dateBorn: Date) {
    this.props.dateBorn = dateBorn;
  }

  public get dateBorn(): Date {
    return this.props.dateBorn;
  }

  public set documentType(documentType: string) {
    this.props.documentType = documentType;
  }

  public get documentType(): string | undefined {
    return this.props.documentType;
  }

  public set document(document: string) {
    this.props.document = document;
  }

  public get document(): string {
    return this.props.document;
  }

  public set photo(photo: string) {
    this.props.photo = photo;
  }

  public get photo(): string | undefined {
    return this.props.photo;
  }

  public set business(business: string) {
    this.props.business = business;
  }

  public get business(): string | undefined {
    return this.props.business;
  }

  public set password(password: string) {
    const pass = new Password(password);
    this.props.password = pass.value;
  }

  public get password(): string | undefined {
    return this.props.password;
  }

  public set token(token: string) {
    this.props.token = token;
  }

  public get token(): string | undefined {
    return this.props.token;
  }

  public set companyId(companyId: number) {
    this.props.companyId = companyId;
  }

  public get companyId(): number {
    return this.props.companyId;
  }

  public set address(address: Address[]) {
    this.props.address = address;
  }

  public get address(): Address[] {
    return this.props.address;
  }

  public set image(image: string) {
    this.props.image = image;
  }

  public get image(): string {
    return this.props.image;
  }
}
