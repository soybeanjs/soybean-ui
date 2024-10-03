import type {
  CollapsibleRootEmits,
  CollapsibleContentProps as _CollapsibleContentProps,
  CollapsibleRootProps as _CollapsibleRootProps
} from 'radix-vue';
import type { ClassValue, ClassValueProp } from '../../types';

export type CollapsibleRootProps = ClassValueProp & Pick<_CollapsibleRootProps, 'open' | 'defaultOpen' | 'disabled'>;

export type CollapsibleContentProps = Pick<_CollapsibleContentProps, 'forceMount'> & ClassValueProp;

export type CollapsibleProps = CollapsibleRootProps & {
  contentClass?: ClassValue;
  forceMountContent?: boolean;
};

export type CollapsibleEmits = CollapsibleRootEmits;

export type { CollapsibleRootEmits };
