import type {
  AffixCompactEmits,
  AffixCompactProps,
  AffixUi,
} from '@soybeanjs/headless/affix';
import type { ClassValue } from '@soybeanjs/headless';

export interface AffixProps extends AffixCompactProps {
  /**
   * Additional class names to apply to the content element.
   */
  class?: ClassValue;
  ui?: Partial<AffixUi>;
}

export type AffixEmits = AffixCompactEmits;
