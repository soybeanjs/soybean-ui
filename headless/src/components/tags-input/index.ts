export { default as TagsInputRoot } from './tags-input-root.vue';
export { default as TagsInputInput } from './tags-input-input.vue';
export { default as TagsInputItem } from './tags-input-item.vue';
export { default as TagsInputItemText } from './tags-input-item-text.vue';
export { default as TagsInputItemDelete } from './tags-input-item-delete.vue';
export { default as TagsInputClear } from './tags-input-clear.vue';

export { provideTagsInputUi } from './context';

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
} from './types';
