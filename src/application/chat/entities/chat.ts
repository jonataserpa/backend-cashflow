import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/Replace';

export interface ChatProps {
  message: string;
  createdAt: Date;
}

export class Chat {
  private props: ChatProps;

  constructor(props: Replace<ChatProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set message(message: string) {
    this.props.message = message;
  }

  public get message(): string {
    return this.props.message;
  }
}
