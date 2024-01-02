import { Replace } from '@helpers/Replace';

export interface VideoProps {
  prompt: string;
  createdAt: Date;
}

export class Video {
  private props: VideoProps;

  constructor(props: Replace<VideoProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set prompt(prompt: string) {
    this.props.prompt = prompt;
  }

  public get prompt(): string {
    return this.props.prompt;
  }
}
