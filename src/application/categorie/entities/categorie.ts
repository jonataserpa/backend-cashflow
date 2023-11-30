import { ICategorieProps } from '../interfaces/categorie.interface';

export class Categorie {
  private props: ICategorieProps;

  constructor(props: ICategorieProps) {
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

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set uri(uri: string) {
    this.props.uri = uri;
  }

  public get uri(): string | undefined {
    return this.props.uri;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public set cover(cover: string) {
    this.props.cover = cover;
  }

  public get cover(): string {
    return this.props.cover;
  }

  public set type(type: string) {
    this.props.type = type;
  }

  public get type(): string | undefined {
    return this.props.type;
  }

  public set companyId(companyId: number) {
    this.props.companyId = companyId;
  }

  public get companyId(): number {
    return this.props.companyId;
  }
}
