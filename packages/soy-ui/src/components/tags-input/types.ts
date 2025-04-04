import type {
  AcceptableInputValue,
  ClassValue,
  TagsInputRootEmits,
  TagsInputInputProps as _TagsInputInputProps,
  TagsInputItemDeleteProps as _TagsInputItemDeleteProps,
  TagsInputItemProps as _TagsInputItemProps,
  TagsInputItemTextProps as _TagsInputItemTextProps,
  TagsInputRootProps as _TagsInputRootProps
} from '@soybean-ui/primitives';
import type { TagsInputSlots, ThemeSize } from '@soybean-ui/variants';

export interface TagsInputRootProps<T extends AcceptableInputValue> extends _TagsInputRootProps<T> {
  size?: ThemeSize;
}

export interface TagsInputInputProps extends _TagsInputInputProps {
  size?: ThemeSize;
}

export interface TagsInputItemProps extends _TagsInputItemProps {
  size?: ThemeSize;
}

export interface TagsInputItemTextProps extends _TagsInputItemTextProps {
  size?: ThemeSize;
}

export interface TagsInputItemDeleteProps extends _TagsInputItemDeleteProps {
  size?: ThemeSize;
}

export type TagsInputUi = Partial<Record<TagsInputSlots, ClassValue>>;

export interface TagsInputProps<T extends AcceptableInputValue> extends TagsInputRootProps<T>, TagsInputInputProps {
  disabledValue?: T[];
  ui?: TagsInputUi;
}

export type TagsInputEmits<T extends AcceptableInputValue> = TagsInputRootEmits<T>;

export type { TagsInputRootEmits };
