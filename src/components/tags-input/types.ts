import type { TagsInputRootEmits, TagsInputRootProps, TagsInputUi } from '@soybeanjs/headless/tags-input';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the tags input component.
 */
export interface TagsInputProps<T = string> extends TagsInputRootProps<T> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<TagsInputUi>;
}

/**
 * Emits for the tags input component.
 */
export type TagsInputEmits<T = string> = TagsInputRootEmits<T>;
