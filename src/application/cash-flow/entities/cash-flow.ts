import { ICashFlowProps } from '../interfaces/cash-flow.interface';

export class CashFlow {
  private props: ICashFlowProps;

  constructor(props: ICashFlowProps) {
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

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public set observation(observation: string) {
    this.props.observation = observation;
  }

  public get observation(): string | undefined {
    return this.props.observation;
  }

  public set type(type: string) {
    this.props.type = type;
  }

  public get type(): string {
    return this.props.type;
  }
}
