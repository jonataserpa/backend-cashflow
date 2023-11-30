import { IServiceProps } from '../interfaces/service.interface';

export class Service {
  private props: IServiceProps;

  constructor(props: IServiceProps) {
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

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get status(): string | undefined {
    return this.props.status;
  }
}
