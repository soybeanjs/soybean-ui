import type {
  ClassValue,
  SplitterPanelEmits as ResizablePanelEmits,
  SplitterPanelProps as ResizablePanelProps,
  SplitterGroupEmits,
  SplitterGroupProps,
  SplitterResizeHandleEmits,
  SplitterResizeHandleProps
} from '@soybean-ui/primitives';
import type { ResizableSlots } from '@soybean-ui/variants';

type ResizableHandleSlots = Extract<ResizableSlots, 'handleIconRoot' | 'handleIcon'>;

type ResizableHandleUi = Partial<Record<ResizableHandleSlots, ClassValue>>;

export interface ResizableHandleProps extends SplitterResizeHandleProps {
  withHandle?: boolean;
  ui?: ResizableHandleUi;
}
export type ResizableHandleEmits = SplitterResizeHandleEmits;

export interface ResizablePanelGroupProps extends SplitterGroupProps {}
export type ResizablePanelGroupEmits = SplitterGroupEmits;

export type { ResizablePanelEmits, ResizablePanelProps };
