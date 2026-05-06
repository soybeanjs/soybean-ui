import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { EventHook } from '@vueuse/core';
import type { Direction, FocusIntent, MaybeArray, PropsToContext, TreeSelectEvent, TreeToggleEvent } from '../../types';
import type { CollectionItemData } from '../../composables/use-collection';
import type { PrimitiveProps } from '../primitive/types';
import type { VirtualizerItemProps, VirtualizerRootProps } from '../virtualizer/types';

/**
 * Type information for TreeItemBaseData.
 */
export interface TreeItemBaseData {
  /** Value given to this item */
  value: string;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
}

/**
 * Type information for TreeItemData.
 */
export type TreeItemData<T extends TreeItemBaseData = TreeItemBaseData> = T & {
  /** List of children items */
  children?: TreeItemData<T>[];
};

/**
 * Type information for TreeSelectBehavior.
 */
export type TreeSelectBehavior = 'toggle' | 'replace';

/**
 * Type information for TreeToggleBehavior.
 */
export type TreeToggleBehavior = 'single' | 'multiple';

type IsMultiple<U extends MaybeArray<string> | undefined, M extends boolean> = U extends string
  ? false
  : M extends true
    ? true
    : false;

/**
 * Properties for the TreeRoot component.
 */
export interface TreeRootProps<
  T extends TreeItemData = TreeItemData,
  U extends MaybeArray<string> | undefined = MaybeArray<string> | undefined,
  M extends boolean = boolean
>
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect' | 'onToggle'> {
  /** The controlled value of the tree. Can be bound-with with `v-model`. */
  modelValue?: U;
  /** The value of the tree when initially rendered. Use when you do not need to control the state of the tree */
  defaultValue?: U;
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

/**
 * Events for the TreeRoot component.
 */
export type TreeRootEmits<M extends boolean | undefined> = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: M extends true ? string[] : string];
  /**
   * Emitted when the expanded state changes.
   */
  'update:expanded': [value: string[]];
};

/**
 * Type information for FlattenedItem.
 */
export type FlattenedItem<T extends TreeItemData> = {
  /**
   * Id.
   */
  _id: string;
  /**
   * Index of the current item.
   */
  index: number;
  /**
   * Value associated with the current item.
   */
  value: string;
  /**
   * Data.
   */
  data: T;
  /**
   * Level.
   */
  level: number;
  /**
   * Whether the component has children.
   */
  hasChildren: boolean;
  /**
   * Parent.
   */
  parent?: T;
  /**
   * Bind.
   */
  bind: {
    data: T;
    level: number;
    [key: string]: any;
  };
};

/**
 * Properties for the TreeItem component.
 */
export interface TreeItemProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect' | 'onToggle'> {
  /**
   * Value associated with the current item.
   */
  value: string;
  /**
   * Level.
   */
  level: number;
  /** When `true`, prevents the user from selecting or toggling the item. */
  disabled?: boolean;
  /** When `true`, prevents the user from selecting the item. */
  disabledSelect?: boolean;
  /** When `true`, prevents the user from toggling the item. */
  disabledToggle?: boolean;
}

/**
 * Events for the TreeItem component.
 */
export type TreeItemEmits = {
  /** Event handler called when selecting item. */
  select: [event: TreeSelectEvent<string>];
  /** Event handler called when toggling item. */
  toggle: [event: TreeToggleEvent<string>];
};

/**
 * Properties for the TreeVirtualizerRoot component.
 */
export interface TreeVirtualizerRootProps<
  T extends TreeItemData = TreeItemData,
  U extends MaybeArray<string> | undefined = MaybeArray<string> | undefined,
  M extends boolean = boolean
>
  extends TreeRootProps<T, U, M>, Omit<VirtualizerRootProps<FlattenedItem<T>>, 'dir' | 'items'> {}

/**
 * Events for the TreeVirtualizerRoot component.
 */
export type TreeVirtualizerRootEmits<M extends boolean | undefined> = TreeRootEmits<M>;

/**
 * Properties for the TreeVirtualizerItem component.
 */
export interface TreeVirtualizerItemProps extends TreeItemProps, VirtualizerItemProps {}

/**
 * Events for the TreeVirtualizerItem component.
 */
export type TreeVirtualizerItemEmits = TreeItemEmits;

/**
 * Parameters used to create the TreeRoot context.
 */
export interface TreeRootContextParams extends PropsToContext<
  TreeRootProps,
  'items' | 'dir' | 'multiple' | 'disabled' | 'selectionBehavior' | 'propagateSelect' | 'bubbleSelect'
> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<MaybeArray<string> | undefined>;
  /**
   * Expanded used by the component context.
   */
  expanded: ShallowRef<string[]>;
  /**
   * Selected keys used by the component context.
   */
  selectedKeys: ComputedRef<string[]>;
  /**
   * Callback invoked when the select event fires.
   */
  onSelect: (value: string) => void;
  /**
   * Callback invoked when the toggle event fires.
   */
  onToggle: (value: string) => void;
  /**
   * Expanded items used by the component context.
   */
  expandedItems: ComputedRef<FlattenedItem<TreeItemData>[]>;
  /**
   * Whether virtualization is enabled.
   */
  isVirtual: ShallowRef<boolean>;
  /**
   * Virtual keydown hook used by the component context.
   */
  virtualKeydownHook: EventHook<KeyboardEvent>;
  /**
   * Get items used by the component context.
   */
  getItems?: () => CollectionItemData[] | undefined;
  /**
   * Handle multiple replace used by the component context.
   */
  handleMultipleReplace: (
    intent: FocusIntent,
    element: HTMLElement | null,
    expanded: string[],
    getItems?: () => CollectionItemData[] | undefined
  ) => void;
}
