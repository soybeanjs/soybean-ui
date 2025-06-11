import type { Ref } from 'vue';
import type { EventHook } from '@vueuse/core';
import type { ClassValueProp, Direction, PrimitiveProps, TreeSelectEvent, TreeToggleEvent } from '../../types';
// Root
export interface TreeRootProps<
  T = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  M extends boolean = false
> extends ClassValueProp {
  /** The controlled value of the tree. Can be bound-with with `v-model`. */
  modelValue?: M extends true ? U[] : U;
  /** The value of the tree when initially rendered. Use when you do not need to control the state of the tree */
  defaultValue?: M extends true ? U[] : U;
  /** List of items */
  items?: T[];
  /** The controlled value of the expanded item. Can be bound-with with `v-model`. */
  expanded?: string[];
  /** The value of the expanded tree when initially rendered. */
  defaultExpanded?: string[];
  /** This function is passed the index of each item and should return a unique key for that item */
  getKey: (val: T) => string;
  /** This function is passed the index of each item and should return a list of children for that item */
  getChildren?: (val: T) => T[] | undefined;
  /** How multiple selection should behave in the collection. */
  selectionBehavior?: 'toggle' | 'replace';
  /** Whether multiple options can be selected or not. */
  multiple?: M;
  /** The reading direction. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with tree */
  disabled?: boolean;
  /** When `true`, selecting parent will select the descendants. */
  propagateSelect?: boolean;
  /** When `true`, selecting children will update the parent state. */
  bubbleSelect?: boolean;
}
export type TreeRootPropsWithPrimitive<
  T = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  M extends boolean = false
> = TreeRootProps<T, U, M> & PrimitiveProps;

export type TreeRootEmits<T = Record<string, any>, M extends boolean = false> = {
  'update:modelValue': [val: M extends true ? T[] : T];
  'update:expanded': [val: string[]];
};

export interface TreeRootContext<T = Record<string, any>> {
  modelValue: Ref<T | T[]>;
  selectedKeys: Ref<string[]>;
  onSelect: (val: T) => void;
  expanded: Ref<string[]>;
  onToggle: (val: T) => void;
  items: Ref<T[]>;
  expandedItems: Ref<FlattenedItem<T>[]>;
  getKey: (val: T) => string;
  getChildren: (val: T) => T[] | undefined;
  multiple: Ref<boolean>;
  disabled: Ref<boolean>;
  dir: Ref<Direction>;
  propagateSelect: Ref<boolean>;
  bubbleSelect: Ref<boolean>;
  isVirtual: Ref<boolean>;
  virtualKeydownHook: EventHook<KeyboardEvent>;
  handleMultipleReplace: any;
}

// Item
export interface TreeItemProps<T> extends ClassValueProp {
  /** Value given to this item */
  value: T;
  /** Level of depth */
  level: number;
}
export type TreeItemPropsWithPrimitive<T> = TreeItemProps<T> & PrimitiveProps;

export type TreeItemEmits<T> = {
  /** Event handler called when selecting item. */
  select: [event: TreeSelectEvent<T>];
  /** Event handler called when toggling item. */
  toggle: [event: TreeToggleEvent<T>];
};

// Virtualizer
export interface TreeVirtualizerProps {
  /** Number of items rendered outside the visible area */
  overscan?: number;
  /** Estimated size (in px) of each item */
  estimateSize?: number;
  /** Text content for each item to achieve type-ahead feature */
  textContent?: (item: Record<string, any>) => string;
}

export type FlattenedItem<T> = {
  _id: string;
  index: number;
  value: T;
  level: number;
  hasChildren: boolean;
  parentItem?: T;
  bind: {
    value: T;
    level: number;
    [key: string]: any;
  };
};
