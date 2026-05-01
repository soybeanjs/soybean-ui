import type { AffixCompactEmits, AffixCompactProps, AffixUi } from '@soybeanjs/headless/affix';
import type { ClassValue } from '@soybeanjs/headless';

/**
 * Props for the affix component.
 */
export interface AffixProps extends AffixCompactProps {
  /**
   * Additional class names to apply to the content element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<AffixUi>;
}

/**
 * Emits for the affix component.
 */
export type AffixEmits = AffixCompactEmits;
