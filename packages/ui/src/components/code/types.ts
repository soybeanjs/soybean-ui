import type { CodeRootProps, CodeUi } from '@soybeanjs/headless/code';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * The visual variant of the code block.
 */
export type CodeVariant = 'block' | 'inline';

/**
 * Properties for the Code component.
 */
export interface CodeProps extends CodeRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The visual variant of the code.
   *
   * @default 'block'
   */
  variant?: CodeVariant;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CodeUi>;
}
