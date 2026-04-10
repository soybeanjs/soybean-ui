import type {
  ClassValue,
  SplitterGroupEmits as HeadlessSplitterGroupEmits,
  SplitterGroupProps as HeadlessSplitterGroupProps,
  SplitterPanelEmits as HeadlessSplitterPanelEmits,
  SplitterPanelProps as HeadlessSplitterPanelProps,
  SplitterResizeHandleEmits as HeadlessSplitterResizeHandleEmits,
  SplitterResizeHandleProps as HeadlessSplitterResizeHandleProps,
  SplitterUi
} from '@soybeanjs/headless';

export interface SplitterGroupProps extends HeadlessSplitterGroupProps {
  class?: ClassValue;
  ui?: Partial<SplitterUi>;
}

export type SplitterGroupEmits = HeadlessSplitterGroupEmits;

export interface SplitterPanelProps extends HeadlessSplitterPanelProps {
  class?: ClassValue;
}

export type SplitterPanelEmits = HeadlessSplitterPanelEmits;

export interface SplitterResizeHandleProps extends HeadlessSplitterResizeHandleProps {
  class?: ClassValue;
  withHandle?: boolean;
}

export type SplitterResizeHandleEmits = HeadlessSplitterResizeHandleEmits;
