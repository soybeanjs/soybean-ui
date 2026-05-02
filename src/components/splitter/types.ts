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
 * Props for the splitter group component.
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
 * Emits for the splitter group component.
 */
export type SplitterGroupEmits = HeadlessSplitterGroupEmits;

/**
 * Props for the splitter panel component.
 */
export interface SplitterPanelProps extends HeadlessSplitterPanelProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
}

/**
 * Emits for the splitter panel component.
 */
export type SplitterPanelEmits = HeadlessSplitterPanelEmits;

/**
 * Props for the splitter resize handle component.
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
 * Emits for the splitter resize handle component.
 */
export type SplitterResizeHandleEmits = HeadlessSplitterResizeHandleEmits;
