import type {
  AffixRootEmits,
  AffixRootProps,
  AffixPlaceholderProps,
  AffixContentProps,
  AffixUi,
  ClassValue
} from '@soybeanjs/headless';

export interface AffixProps extends AffixRootProps {
  /**
   * Additional class names to apply to the content element.
   */
  class?: ClassValue;
  ui?: Partial<AffixUi>;
  placeholderProps?: AffixPlaceholderProps;
  contentProps?: AffixContentProps;
}

export type AffixEmits = AffixRootEmits;
