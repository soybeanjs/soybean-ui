export {
  TagsInputClear as STagsInputClear,
  TagsInputInput as STagsInputInput,
  TagsInputItem as STagsInputItem,
  TagsInputItemText as STagsInputItemText
} from '@soybeanjs/headless/tags-input';
export { default as STagsInput } from './tags-input.vue';
export { default as STagsInputItemDelete } from './tags-input-item-delete.vue';

export type {
  TagsInputAcceptableValue,
  TagsInputRootProps,
  TagsInputRootEmits,
  TagsInputInputProps,
  TagsInputItemProps,
  TagsInputItemTextProps,
  TagsInputItemDeleteProps,
  TagsInputClearProps,
  TagsInputUiSlot,
  TagsInputUi
} from '@soybeanjs/headless/tags-input';
export type * from './types';
