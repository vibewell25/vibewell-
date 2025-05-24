declare module '@storybook/react' {
  import { ComponentType, ReactNode } from 'react';

  export interface Meta<T> {
    title: string;
    component: ComponentType<T>;
    parameters?: {
      layout?: string;
      [key: string]: any;
    };
    tags?: string[];
    argTypes?: Record<string, any>;
    args?: Partial<T>;
    decorators?: Array<(Story: any) => ReactNode>;
  }

  export interface StoryObj<T> {
    args?: Partial<T>;
    parameters?: Record<string, any>;
    play?: (context: { canvasElement: HTMLElement }) => Promise<void> | void;
    decorators?: Array<(Story: any) => ReactNode>;
  }
} 