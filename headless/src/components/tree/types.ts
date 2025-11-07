import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { EventHook } from '@vueuse/core';
import type { Direction, FocusIntent, MaybeArray, PropsToContext, TreeSelectEvent, TreeToggleEvent } from '../../types';
import type { CollectionItemData } from '../../composables/use-collection';
import type { PrimitiveProps } from '../primitive/types';
import type { VirtualizerItemProps, VirtualizerRootProps } from '../virtualizer/types';

export interface TreeItemBaseData {
  /** Value given to this item */
  value: string;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
}

export type TreeItemData<T extends TreeItemBaseData = TreeItemBaseData> = T & {
  /** List of children items */
  children?: TreeItemData<T>[];
};

export type TreeSelectBehavior = 'toggle' | 'replace';

export type TreeToggleBehavior = 'single' | 'multiple';

type IsMultiple<U extends MaybeArray<string> | undefined, M extends boolean> = U extends string
  ? false
  : M extends true
    ? true
    : false;

export interface TreeRootProps<
  T extends TreeItemData = TreeItemData,
  U extends MaybeArray<string> | undefined = MaybeArray<string> | undefined,
  M extends boolean = boolean
> extends PrimitiveProps,
    /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the tree. Can be bound-with with `v-model`. */
  modelValue?: U;
  /** The value of the tree when initially rendered. Use when you do not need to control the state of the tree */
  defaultValue?: NonNullable<U>;
  /** Determines whether a "single" or "multiple" items can be selected at a time. */
  multiple?: IsMultiple<U, M>;
  /** List of items */
  items?: T[];
  /** The controlled value of the expanded item. Can be bound-with with `v-model`. */
  expanded?: string[];
  /** The value of the expanded tree when initially rendered. */
  defaultExpanded?: string[];
  /** How multiple selection should behave in the collection. */
  selectionBehavior?: TreeSelectBehavior;
  /**
   * Determines whether a "single" or "multiple" items can be toggled at a time.
   *
   * @defaultValue 'multiple'
   * */
  toggleBehavior?: TreeToggleBehavior;
  /** The reading direction. */
  dir?: Direction;
  /**
   * When `true`, keyboard navigation will loop from last item to first, and vice versa.
   *
   * @defaultValue true
   */
  loop?: boolean;
  /** When `true`, prevents the user from interacting with tree */
  disabled?: boolean;
  /** When `true`, selecting parent will select the descendants. */
  propagateSelect?: boolean;
  /** When `true`, selecting children will update the parent state. */
  bubbleSelect?: boolean;
  /** When `true`, parent can be selected. */
  allowParentSelect?: boolean;
}

export type TreeRootEmits<M extends boolean | undefined> = {
  'update:modelValue': [value: M extends true ? string[] : string];
  'update:expanded': [value: string[]];
};

export type FlattenedItem<T extends TreeItemData> = {
  _id: string;
  index: number;
  value: string;
  data: T;
  level: number;
  hasChildren: boolean;
  parent?: T;
  bind: {
    data: T;
    level: number;
    [key: string]: any;
  };
};

export interface TreeItemProps
  extends PrimitiveProps,
    /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect' | 'onToggle'> {
  value: string;
  level: number;
  /** When `true`, prevents the user from selecting or toggling the item. */
  disabled?: boolean;
  /** When `true`, prevents the user from selecting the item. */
  disabledSelect?: boolean;
  /** When `true`, prevents the user from toggling the item. */
  disabledToggle?: boolean;
}

export type TreeItemEmits = {
  /** Event handler called when selecting item. */
  select: [event: TreeSelectEvent<string>];
  /** Event handler called when toggling item. */
  toggle: [event: TreeToggleEvent<string>];
};

export interface TreeVirtualizerRootProps<
  T extends TreeItemData = TreeItemData,
  U extends MaybeArray<string> | undefined = MaybeArray<string> | undefined,
  M extends boolean = boolean
> extends TreeRootProps<T, U, M>,
    Omit<VirtualizerRootProps<FlattenedItem<T>>, 'dir' | 'items'> {}

export type TreeVirtualizerRootEmits<M extends boolean | undefined> = TreeRootEmits<M>;

export interface TreeVirtualizerItemProps extends TreeItemProps, VirtualizerItemProps {}

export type TreeVirtualizerItemEmits = TreeItemEmits;

export interface TreeRootContextParams
  extends PropsToContext<
    TreeRootProps,
    'items' | 'dir' | 'multiple' | 'disabled' | 'selectionBehavior' | 'propagateSelect' | 'bubbleSelect'
  > {
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  expanded: ShallowRef<string[]>;
  selectedKeys: ComputedRef<string[]>;
  onSelect: (value: string) => void;
  onToggle: (value: string) => void;
  expandedItems: ComputedRef<FlattenedItem<TreeItemData>[]>;
  isVirtual: ShallowRef<boolean>;
  virtualKeydownHook: EventHook<KeyboardEvent>;
  getItems?: () => CollectionItemData[] | undefined;
  handleMultipleReplace: (
    intent: FocusIntent,
    element: HTMLElement | null,
    expanded: string[],
    getItems?: () => CollectionItemData[] | undefined
  ) => void;
}
