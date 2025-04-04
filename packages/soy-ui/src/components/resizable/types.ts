import type {
  ClassValue,
  SplitterPanelEmits as ResizablePanelEmits,
  SplitterPanelProps as ResizablePanelProps,
  SplitterGroupEmits,
  SplitterGroupProps,
  SplitterResizeHandleEmits,
  SplitterResizeHandleProps
} from '@soybean-ui/primitives';
import type { ResizableSlots, ThemeSize } from '@soybean-ui/variants';

type ResizableHandleSlots = Extract<ResizableSlots, 'handleIconRoot' | 'handleIcon'>;

type ResizableHandleUi = Partial<Record<ResizableHandleSlots, ClassValue>>;

export interface ResizableHandleProps extends SplitterResizeHandleProps {
  size?: ThemeSize;
  ui?: ResizableHandleUi;
  withHandle?: boolean;
}
export type ResizableHandleEmits = SplitterResizeHandleEmits;

export interface ResizablePanelGroupProps extends SplitterGroupProps {
  size?: ThemeSize;
}
export type ResizablePanelGroupEmits = SplitterGroupEmits;

export type { ResizablePanelEmits, ResizablePanelProps };
