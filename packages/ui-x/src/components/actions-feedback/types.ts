import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * The feedback polarity for SxActionsFeedback.
 */
export type FeedbackValue = 'like' | 'dislike';

/**
 * Properties for the SxActionsFeedback component.
 */
export interface ActionsFeedbackProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * The currently active feedback, if any.
   */
  value?: FeedbackValue | null;
  /**
   * Whether the buttons are disabled.
   */
  disabled?: boolean;
  /**
   * Emitted when feedback is given; `null` clears the active state.
   */
  onChange?: (value: FeedbackValue | null) => void;
}
