import type {
  ClassValue,
  CollapsibleContentProps,
  CollapsibleRootEmits,
  CollapsibleRootProps
} from '@soybean-ui/primitives';

export interface CollapsibleProps extends CollapsibleRootProps {
  forceMountContent?: boolean;
  ui?: {
    content?: ClassValue;
  };
}

export type CollapsibleEmits = CollapsibleRootEmits;

export type { CollapsibleRootProps, CollapsibleRootEmits, CollapsibleContentProps };
