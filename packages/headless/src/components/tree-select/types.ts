import type { ComputedRef, ShallowRef } from 'vue';
import type {
  BaseProps,
  Direction,
  DismissableLayerProps,
  ForceMountProps,
  PointerDownOutsideEvent,
  PropsToContext,
  UiClass
} from '../../types';
import type { PopperPositionerProps } from '../popper/types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * A node in the tree-select data.
 */
export interface TreeSelectBaseItem {
  /** The unique value of the node. */
  value: string;
  /** The label displayed for the node. */
  label?: string;
  /** Whether the node is disabled. */
  disabled?: boolean;
  /** Child nodes. */
  children?: TreeSelectBaseItem[];
}

/**
 * The value model of the tree-select: a single value or an array when `multiple`.
 */
export type TreeSelectModelValue = string | string[];

/**
 * Properties for the TreeSelectRoot component.
 */
export interface TreeSelectRootProps extends BaseProps {
  /**
   * The controlled value of the selected node(s). Can be bound as `v-model`.
   */
  modelValue?: TreeSelectModelValue;
  /**
   * The initial value when uncontrolled.
   */
  defaultValue?: TreeSelectModelValue;
  /**
   * Whether multiple nodes can be selected.
   */
  multiple?: boolean;
  /**
   * The tree data source.
   */
  items?: TreeSelectBaseItem[];
  /**
   * Placeholder text shown when nothing is selected.
   */
  placeholder?: string;
  /**
   * The controlled open state of the popup. Can be bound as `v-model:open`.
   */
  open?: boolean;
  /**
   * The initial open state when uncontrolled.
   */
  defaultOpen?: boolean;
  /**
   * Whether the tree-select is disabled.
   */
  disabled?: boolean;
  /**
   * Whether a clear button is shown.
   */
  clearable?: boolean;
  /**
   * Whether parent nodes can be selected.
   */
  allowParentSelect?: boolean;
  /**
   * Whether selecting a parent selects all its descendants.
   */
  propagateSelect?: boolean;
  /**
   * Whether selecting children updates the parent selection state.
   */
  bubbleSelect?: boolean;
  /**
   * The controlled expanded node values.
   */
  expanded?: string[];
  /**
   * The initial expanded node values when uncontrolled.
   */
  defaultExpanded?: string[];
  /**
   * The reading direction.
   */
  dir?: Direction;
}

/**
 * Events for the TreeSelectRoot component.
 */
export type TreeSelectRootEmits = {
  /**
   * Emitted when the selected value changes.
   */
  'update:modelValue': [value: TreeSelectModelValue];
  /**
   * Emitted when the popup open state changes.
   */
  'update:open': [value: boolean];
};

/**
 * Properties for the TreeSelectTrigger component.
 */
export interface TreeSelectTriggerProps extends PrimitiveWithBaseProps {}

/**
 * Properties for the TreeSelectContent component.
 */
export interface TreeSelectContentProps extends PopperPositionerProps, DismissableLayerProps, ForceMountProps {}

/**
 * Events for the TreeSelectContent component.
 */
export type TreeSelectContentEmits = {
  /**
   * Emitted when the Escape key is pressed inside the popup.
   */
  escapeKeyDown: [event: KeyboardEvent];
  /**
   * Emitted when a pointer is pressed outside the popup.
   */
  pointerDownOutside: [event: PointerDownOutsideEvent];
};

/**
 * Context for the TreeSelectRoot component.
 */
export interface TreeSelectRootContext extends PropsToContext<
  TreeSelectRootProps,
  'items' | 'placeholder' | 'disabled' | 'clearable' | 'multiple' | 'dir'
> {
  /** The controllable open state. */
  open: ShallowRef<boolean>;
  /** The controllable model value. */
  modelValue: ShallowRef<TreeSelectModelValue | undefined>;
  /** Labels resolved from the selected values. */
  selectedLabels: ComputedRef<string[]>;
  /** The id associated with the popup for ARIA. */
  contentId: string;
  /** The open/closed state reflected as data. */
  dataState: ComputedRef<string>;
  /** Set the popup open state. */
  onOpenChange: (value: boolean) => void;
  /** Set the model value and emit the change event. */
  onModelValueChange: (value: TreeSelectModelValue) => void;
}

/**
 * Properties for the TreeSelectCompact component.
 */
export interface TreeSelectCompactProps extends TreeSelectRootProps {
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: TreeSelectTriggerProps;
  /**
   * Properties forwarded to the portal.
   */
  portalProps?: BaseProps;
  /**
   * Properties forwarded to the popup content.
   */
  contentProps?: TreeSelectContentProps;
  /**
   * The placement of the popup.
   */
  placement?: PopperPositionerProps['placement'];
  /**
   * Whether to show the arrow on the popup.
   */
  showArrow?: boolean;
}

/**
 * Events for the TreeSelectCompact component.
 */
export type TreeSelectCompactEmits = TreeSelectRootEmits;

/**
 * Slots for the TreeSelectCompact component.
 */
export type TreeSelectCompactSlots = {
  /**
   * Custom trigger value content. Receives `{ labels, modelValue }`.
   */
  value?: (props: { labels: string[]; modelValue: TreeSelectModelValue | undefined }) => any;
  /**
   * Custom node rendering. Receives the flattened item and tree item slot props.
   */
  node?: (props: Record<string, any>) => any;
};

/**
 * Available UI slots for the TreeSelect component.
 */
export type TreeSelectUiSlot =
  | 'root'
  | 'trigger'
  | 'value'
  | 'placeholder'
  | 'triggerIcon'
  | 'popup'
  | 'panel'
  | 'node'
  | 'nodeLabel'
  | 'nodeCheck'
  | 'arrow';

/**
 * UI class overrides for the TreeSelect component.
 */
export type TreeSelectUi = UiClass<TreeSelectUiSlot>;
