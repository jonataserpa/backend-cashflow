import { ICompanyProps } from '../interfaces/company.interface';

export class Company {
  private props: ICompanyProps;

  constructor(props: ICompanyProps) {
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

  public set status(status: string) {
    this.props.status = status;
  }

  public get status(): string {
    return this.props.status;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string | undefined {
    return this.props.name;
  }

  public set socialReason(socialReason: string) {
    this.props.socialReason = socialReason;
  }

  public get socialReason(): string | undefined {
    return this.props.socialReason;
  }

  public set url(url: string) {
    this.props.url = url;
  }

  public get url(): string {
    return this.props.url;
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  public get cnpj(): string | undefined {
    return this.props.cnpj;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string | undefined {
    return this.props.phone;
  }

  public set cellphone(cellphone: string) {
    this.props.cellphone = cellphone;
  }

  public get cellphone(): string {
    return this.props.cellphone;
  }

  public set responsible(responsible: string) {
    this.props.responsible = responsible;
  }

  public get responsible(): string | undefined {
    return this.props.responsible;
  }

  public set emailResponsible(emailResponsible: string) {
    this.props.emailResponsible = emailResponsible;
  }

  public get emailResponsible(): string | undefined {
    return this.props.emailResponsible;
  }

  public set followup(followup: string) {
    this.props.followup = followup;
  }

  public get followup(): string | undefined {
    return this.props.followup;
  }
}
