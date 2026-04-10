import type { AffixRootEmits, AffixRootProps, ClassValue } from '@soybeanjs/headless';

export interface AffixProps extends AffixRootProps {
  class?: ClassValue;
}

export type AffixEmits = AffixRootEmits;
