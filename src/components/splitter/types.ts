import type {
  SplitterGroupEmits as HeadlessSplitterGroupEmits,
  SplitterGroupProps as HeadlessSplitterGroupProps,
  SplitterPanelEmits as HeadlessSplitterPanelEmits,
  SplitterPanelProps as HeadlessSplitterPanelProps,
  SplitterResizeHandleEmits as HeadlessSplitterResizeHandleEmits,
  SplitterResizeHandleProps as HeadlessSplitterResizeHandleProps,
  SplitterUi
} from '@soybeanjs/headless/splitter';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Properties for the splitter group component.
 */
export interface SplitterGroupProps extends HeadlessSplitterGroupProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<SplitterUi>;
}

/**
 * Events for the splitter group component.
 */
export type SplitterGroupEmits = HeadlessSplitterGroupEmits;

/**
 * Properties for the splitter panel component.
 */
export interface SplitterPanelProps extends HeadlessSplitterPanelProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
}

/**
 * Events for the splitter panel component.
 */
export type SplitterPanelEmits = HeadlessSplitterPanelEmits;

/**
 * Properties for the splitter resize handle component.
 */
export interface SplitterResizeHandleProps extends HeadlessSplitterResizeHandleProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Whether with handle.
   */
  withHandle?: boolean;
}

/**
 * Events for the splitter resize handle component.
 */
export type SplitterResizeHandleEmits = HeadlessSplitterResizeHandleEmits;
