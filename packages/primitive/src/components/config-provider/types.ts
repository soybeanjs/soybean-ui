import type { Ref } from 'vue';
import type { Direction, ScrollBodyOption } from '../../types';

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
  /** The global scroll body behavior of your application. This will be inherited by the related primitives. */
  scrollBody?: boolean | ScrollBodyOption;
  /**
   * The global `nonce` value of your application. This will be inherited by the related primitives.
   *
   * @type string
   */
  nonce?: string;
  /** The global `useId` injection as a workaround for preventing hydration issue. */
  useId?: () => string;
}

export interface ConfigProviderContext {
  dir?: Ref<Direction>;
  locale?: Ref<string>;
  scrollBody?: Ref<boolean | ScrollBodyOption>;
  nonce?: Ref<string | undefined>;
  useId?: () => string;
}
