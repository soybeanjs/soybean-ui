import type {
  CollapsibleContentProps as $CollapsibleContentProps,
  CollapsibleRootProps,
  CollapsibleTriggerProps
} from 'radix-vue';
import type { ClassValue } from '../../types';

export type CollapsibleContentProps = $CollapsibleContentProps & {
  class?: ClassValue;
};

export type CollapsibleProps = CollapsibleRootProps & {
  contentClass?: ClassValue;
  forceMountContent?: boolean;
};

export type { CollapsibleRootProps, CollapsibleTriggerProps };
