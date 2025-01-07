import type {
  ClassValue,
  CollapsibleContentProps,
  CollapsibleRootEmits,
  CollapsibleRootProps
} from '@soybean-ui/primitives';

export interface CollapsibleProps extends CollapsibleRootProps {
  contentClass?: ClassValue;
  forceMountContent?: boolean;
}

export type CollapsibleEmits = CollapsibleRootEmits;

export type { CollapsibleRootProps, CollapsibleRootEmits, CollapsibleContentProps };
