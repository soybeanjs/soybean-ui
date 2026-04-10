import type { ClassValue, TagsInputRootEmits, TagsInputRootProps, TagsInputUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface TagsInputProps<T = string> extends TagsInputRootProps<T> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TagsInputUi>;
}

export type TagsInputEmits<T = string> = TagsInputRootEmits<T>;
