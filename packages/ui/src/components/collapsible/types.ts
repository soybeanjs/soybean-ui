import type {
  ClassValue,
  CollapsibleContentProps,
  CollapsibleRootEmits,
  CollapsibleRootProps,
  CollapsibleRootPropsWithPrimitive
} from '@soybean-ui/primitives';

export interface CollapsibleProps extends CollapsibleRootPropsWithPrimitive {
  forceMountContent?: boolean;
  ui?: {
    content?: ClassValue;
  };
}

export type CollapsibleEmits = CollapsibleRootEmits;

export type { CollapsibleRootProps, CollapsibleRootPropsWithPrimitive, CollapsibleRootEmits, CollapsibleContentProps };
