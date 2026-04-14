import type { ComputedRef, CSSProperties, HTMLAttributes, ShallowRef } from 'vue';
import type { DataOrientation, Direction, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface SplitterGroupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The orientation of the splitter group.
   *
   * Either `horizontal` or `vertical`. Defaults to `horizontal`.
   */
  direction?: DataOrientation;
  /**
   * The reading direction of the splitter group.
   */
  dir?: Direction;
  /**
   * The initial layout percentages for the panels.
   */
  defaultLayout?: number[];
  /**
   * The percentage step size used for keyboard resizing.
   */
  keyboardResizeBy?: number;
}

export type SplitterGroupEmits = {
  /**
   * Event handler called when the group layout changes.
   */
  layout: [value: number[]];
};

export interface SplitterPanelProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The initial size of the panel as a percentage of the group.
   */
  defaultSize?: number;
  /**
   * Whether the panel can collapse.
   */
  collapsible?: boolean;
  /**
   * The size of the panel when collapsed.
   */
  collapsedSize?: number;
  /**
   * The maximum size of the panel.
   */
  maxSize?: number;
  /**
   * The minimum size of the panel when expanded.
   */
  minSize?: number;
  /**
   * The order of the panel within the group.
   */
  order?: number;
}

export type SplitterPanelEmits = {
  /**
   * Event handler called when the panel collapses.
   */
  collapse: [];
  /**
   * Event handler called when the panel expands.
   */
  expand: [];
  /**
   * Event handler called when the panel size changes.
   */
  resize: [size: number, prevSize: number | undefined];
};

export interface SplitterResizeHandleProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether the resize handle is disabled.
   */
  disabled?: boolean;
  /**
   * The tabindex of the resize handle.
   */
  tabindex?: number;
}

export type SplitterResizeHandleEmits = {
  /**
   * Event handler called when dragging state changes.
   */
  dragging: [value: boolean];
};

export interface SplitterPanelRecord {
  id: string;
  registrationIndex: number;
  order: ComputedRef<number | undefined>;
  defaultSize: ComputedRef<number | undefined>;
  minSize: ComputedRef<number>;
  maxSize: ComputedRef<number>;
  collapsible: ComputedRef<boolean>;
  collapsedSize: ComputedRef<number>;
  onCollapse: () => void;
  onExpand: () => void;
  onResize: (size: number, prevSize: number | undefined) => void;
}

export type SplitterPanelRegistration = Omit<SplitterPanelRecord, 'registrationIndex'>;

export interface SplitterGroupContext extends PropsToContext<
  SplitterGroupProps,
  'direction' | 'dir' | 'keyboardResizeBy'
> {
  groupId: string;
  layout: ShallowRef<number[]>;
  rootElement: ShallowRef<HTMLElement | undefined>;
  registerPanel: (panel: SplitterPanelRegistration) => void;
  unregisterPanel: (panelId: string) => void;
  refreshLayout: () => void;
  getPanelStyle: (panelId: string) => CSSProperties;
  getPanelSize: (panelId: string) => number | undefined;
  isPanelCollapsed: (panelId: string) => boolean;
  collapsePanel: (panelId: string) => void;
  expandPanel: (panelId: string) => void;
  resizePanel: (panelId: string, size: number) => void;
  resizePanelPair: (pairIndex: number, delta: number) => void;
  getPanelRecordByIndex: (index: number) => SplitterPanelRecord | undefined;
  getPanelBounds: (panelId: string) => { min: number; max: number } | undefined;
  getGroupSize: () => number;
}

export type SplitterUiSlot = 'root' | 'panel' | 'resizeHandle';

export type SplitterUi = UiClass<SplitterUiSlot>;
