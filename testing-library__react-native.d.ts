declare module '@testing-library/react-native' {
  import { ReactElement } from 'react';
  
  export interface RenderOptions {
    container?: Element;
    baseElement?: Element;
    hydrate?: boolean;
    wrapper?: React.ComponentType<{children: React.ReactNode}>;
  }

  // Define a custom ReactTestInstance type that includes props and parent
  export interface ReactTestInstance {
    type: string | React.ComponentType<any>;
    props: any;
    parent: ReactTestInstance | null;
    children: Array<ReactTestInstance | string>;
    [key: string]: any;
  }

  export interface RenderResult {
    container: Element;
    baseElement: Element;
    debug: (baseElement?: Element | DocumentFragment) => void;
    rerender: (ui: React.ReactElement) => void;
    unmount: () => boolean;
    asFragment: () => DocumentFragment;
    queryByTestId: (id: string) => ReactTestInstance | null;
    getByTestId: (id: string) => ReactTestInstance;
    queryByText: (text: string | RegExp) => ReactTestInstance | null;
    getByText: (text: string | RegExp) => ReactTestInstance;
    queryByLabelText: (label: string | RegExp) => ReactTestInstance | null;
    getByLabelText: (label: string | RegExp) => ReactTestInstance;
    queryByPlaceholderText: (placeholder: string | RegExp) => ReactTestInstance | null;
    getByPlaceholderText: (placeholder: string | RegExp) => ReactTestInstance;
    queryByDisplayValue: (value: string | RegExp) => ReactTestInstance | null;
    getByDisplayValue: (value: string | RegExp) => ReactTestInstance;
    queryByRole: (role: string) => ReactTestInstance | null;
    getByRole: (role: string) => ReactTestInstance;
    queryByTitle: (title: string | RegExp) => ReactTestInstance | null;
    getByTitle: (title: string | RegExp) => ReactTestInstance;
    queryAllByTestId: (id: string) => ReactTestInstance[];
    getAllByTestId: (id: string) => ReactTestInstance[];
    queryAllByText: (text: string | RegExp) => ReactTestInstance[];
    getAllByText: (text: string | RegExp) => ReactTestInstance[];
    queryAllByLabelText: (label: string | RegExp) => ReactTestInstance[];
    getAllByLabelText: (label: string | RegExp) => ReactTestInstance[];
    queryAllByPlaceholderText: (placeholder: string | RegExp) => ReactTestInstance[];
    getAllByPlaceholderText: (placeholder: string | RegExp) => ReactTestInstance[];
    queryAllByDisplayValue: (value: string | RegExp) => ReactTestInstance[];
    getAllByDisplayValue: (value: string | RegExp) => ReactTestInstance[];
    queryAllByRole: (role: string) => ReactTestInstance[];
    getAllByRole: (role: string) => ReactTestInstance[];
    queryAllByTitle: (title: string | RegExp) => ReactTestInstance[];
    getAllByTitle: (title: string | RegExp) => ReactTestInstance[];
  }

  export function render(
    ui: ReactElement,
    options?: RenderOptions
  ): RenderResult;

  export function cleanup(): void;

  export function act(callback: () => void): void;
  
  export function fireEvent(element: any, eventName: string, eventData?: any): void;
  
  export namespace fireEvent {
    export function press(element: any): void;
    export function changeText(element: any, text: string): void;
    export function scroll(element: any, eventData?: any): void;
  }
  
  export function waitFor<T>(
    callback: () => T | Promise<T>,
    options?: {
      container?: any;
      timeout?: number;
      interval?: number;
      onTimeout?: (error: Error) => Error;
    }
  ): Promise<T>;
  
  export function waitForElementToBeRemoved<T>(
    callback: () => T | null,
    options?: {
      container?: any;
      timeout?: number;
      interval?: number;
      onTimeout?: (error: Error) => Error;
    }
  ): Promise<void>;
}
