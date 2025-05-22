import type { Direction, PropsToContext, ScrollBodyOption } from '../../types';

export interface ConfigProviderProps {
  /**
   * The global reading direction of your application. This will be inherited by all primitives.
   *
   * @defaultValue 'ltr'
   */
  dir?: Direction;
  /**
   * The global locale of your application. This will be inherited by all primitives.
   *
   * @defaultValue 'en'
   */
  locale?: string;
  /**
   * The global scroll body behavior of your application. This will be inherited by the related primitives.
   *
   * @type boolean
   *
   *   | ScrollBodyOption
   */
  scrollBody?: boolean | ScrollBodyOption;
  /**
   * The global `nonce` value of your application. This will be inherited by the related primitives.
   *
   * @type string
   */
  nonce?: string;
}

export interface ConfigProviderContextParams extends PropsToContext<ConfigProviderProps> {}
