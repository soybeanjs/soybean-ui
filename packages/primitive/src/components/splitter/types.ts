import type { CSSProperties, Ref } from 'vue';
import type { DataOrientation } from '../../types';
import type { PrimitiveProps } from '../primitive';

export interface SplitterGroupProps {
  /** Group id; falls back to `useId` when not provided. */
  id?: string | null;
  /** Unique id used to auto-save group arrangement via `localStorage`. */
  autoSaveId?: string | null;
  /** The group orientation of splitter. */
  direction: DataOrientation;
  /** Step size when arrow key was pressed. */
  keyboardResizeBy?: number | null;
  /** Custom storage API; defaults to localStorage */
  storage?: PanelGroupStorage;
}
export type SplitterGroupPropsWithPrimitive = SplitterGroupProps & PrimitiveProps;

export type SplitterGroupEmits = {
  /** Event handler called when group layout changes */
  layout: [val: number[]];
};

export type PanelGroupStorage = {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
};

export type PanelGroupContext = {
  direction: Ref<DataOrientation>;
  dragState: DragState | null;
  groupId: string;
  reevaluatePanelConstraints: (panelData: PanelData, prevConstraints: PanelConstraints) => void;
  registerPanel: (panelData: PanelData) => void;
  registerResizeHandle: (dragHandleId: string) => ResizeHandler;
  resizePanel: (panelData: PanelData, size: number) => void;
  startDragging: (dragHandleId: string, event: ResizeEvent) => void;
  stopDragging: () => void;
  unregisterPanel: (panelData: PanelData) => void;
  panelGroupElement: Ref<ParentNode | null>;

  // Exposed function for child component
  collapsePanel: (panelData: PanelData) => void;
  expandPanel: (panelData: PanelData) => void;
  isPanelCollapsed: (panelData: PanelData) => boolean;
  isPanelExpanded: (panelData: PanelData) => boolean;
  getPanelSize: (panelData: PanelData) => number;
  getPanelStyle: (panelData: PanelData, defaultSize: number | undefined) => CSSProperties;
};

export interface SplitterPanelProps {
  /** The size of panel when it is collapsed. */
  collapsedSize?: number;
  /** Should panel collapse when resized beyond its `minSize`. When `true`, it will be collapsed to `collapsedSize`. */
  collapsible?: boolean;
  /** Initial size of panel (numeric value between 1-100) */
  defaultSize?: number;
  /** Panel id (unique within group); falls back to `useId` when not provided */
  id?: string;
  /** The maximum allowable size of panel (numeric value between 1-100); defaults to `100` */
  maxSize?: number;
  /** The minimum allowable size of panel (numeric value between 1-100); defaults to `10` */
  minSize?: number;
  /** The order of panel within group; required for groups with conditionally rendered panels */
  order?: number;
}
export type SplitterPanelPropsWithPrimitive = SplitterPanelProps & PrimitiveProps;

export type SplitterPanelEmits = {
  /** Event handler called when panel is collapsed. */
  collapse: [];
  /** Event handler called when panel is expanded. */
  expand: [];
  /** Event handler called when panel is resized; size parameter is a numeric value between 1-100. */
  resize: [size: number, prevSize: number | undefined];
};

export interface SplitterResizeHandleProps {
  /** Resize handle id (unique within group); falls back to `useId` when not provided */
  id?: string;
  /** Allow this much margin when determining resizable handle hit detection */
  hitAreaMargins?: PointerHitAreaMargins;
  /** Tabindex for the handle */
  tabindex?: number;
  /** Disable drag handle */
  disabled?: boolean;
}
export type SplitterResizeHandlePropsWithPrimitive = SplitterResizeHandleProps & PrimitiveProps;

export type SplitterResizeHandleEmits = {
  /** Event handler called when dragging the handler. */
  dragging: [isDragging: boolean];
};

export type PanelResizeHandleOnDragging = (isDragging: boolean) => void;
export type ResizeHandlerState = 'drag' | 'hover' | 'inactive';

export type PanelOnCollapse = () => void;
export type PanelOnExpand = () => void;
export type PanelOnResize = (size: number, prevSize: number | undefined) => void;
export type PanelCallbacks = {
  onCollapse?: PanelOnCollapse;
  onExpand?: PanelOnExpand;
  onResize?: PanelOnResize;
};
export type PanelConstraints = {
  collapsedSize?: number | undefined;
  collapsible?: boolean | undefined;
  defaultSize?: number | undefined;
  /** Panel id (unique within group); falls back to useId when not provided */
  maxSize?: number | undefined;
  minSize?: number | undefined;
};
export type PanelData = {
  callbacks: PanelCallbacks;
  constraints: PanelConstraints;
  id: string;
  idIsFromProps: boolean;
  order: number | null | undefined;
};
export type ResizeEvent = KeyboardEvent | MouseEvent | TouchEvent;
export type ResizeHandler = (event: ResizeEvent) => void;
export type DragState = {
  dragHandleId: string;
  dragHandleRect: DOMRect;
  initialCursorPosition: number;
  initialLayout: number[];
};
export type EagerValuesRef = {
  layout: number[];
  panelDataArray: PanelData[];
  panelDataArrayChanged: boolean;
};
export type ResizeHandlerAction = 'down' | 'move' | 'up';
export type SetResizeHandlerState = (action: ResizeHandlerAction, isActive: boolean, event: ResizeEvent) => void;

export type PointerHitAreaMargins = {
  coarse: number;
  fine: number;
};

export type ResizeHandlerData = {
  direction: Ref<DataOrientation>;
  element: HTMLElement;
  hitAreaMargins: PointerHitAreaMargins;
  setResizeHandlerState: SetResizeHandlerState;
};
