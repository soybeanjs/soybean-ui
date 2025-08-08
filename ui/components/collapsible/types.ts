import type {
  ClassValue,
  CollapsibleContentProps,
  CollapsibleRootEmits,
  CollapsibleRootProps,
  CollapsibleThemeSlot,
  CollapsibleTriggerProps
} from '@headless';
import type { ThemeSize } from '@theme';

export type CollapsibleUi = Partial<Record<CollapsibleThemeSlot, ClassValue>>;

export interface CollapsibleProps extends CollapsibleRootProps {
  size?: ThemeSize;
  ui?: CollapsibleUi;
}

export type CollapsibleEmits = CollapsibleRootEmits;

export type { CollapsibleRootProps, CollapsibleRootEmits, CollapsibleContentProps, CollapsibleTriggerProps };
