import type {
  ClassValue,
  CollapsibleContentProps,
  CollapsibleRootEmits,
  CollapsibleRootProps as _CollapsibleRootProps
} from '@soybean-ui/primitives';
import type { CollapsibleSlots, ThemeSize } from '@soybean-ui/variants';

export interface CollapsibleRootProps extends _CollapsibleRootProps {
  size?: ThemeSize;
}

export type CollapsibleUi = Partial<Record<CollapsibleSlots, ClassValue>>;

export interface CollapsibleProps extends CollapsibleRootProps {
  forceMountContent?: boolean;
  ui?: CollapsibleUi;
}

export type CollapsibleEmits = CollapsibleRootEmits;

export type { CollapsibleRootEmits, CollapsibleContentProps };
