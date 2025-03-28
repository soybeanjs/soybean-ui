<script setup lang="ts" generic="T extends AcceptableInputValue = AcceptableInputValue">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableInputValue } from '@soybean-ui/primitives';
import STagsInputRoot from './tags-input-root.vue';
import STagsInputInput from './tags-input-input.vue';
import STagsInputItem from './tags-input-item.vue';
import STagsInputItemText from './tags-input-item-text.vue';
import STagsInputItemDelete from './tags-input-item-delete.vue';
import type { TagsInputEmits, TagsInputProps } from './types';

defineOptions({
  name: 'STagsInput'
});

const {
  class: cls,
  size,
  ui,
  disabledValue,
  placeholder,
  autoFocus,
  maxLength,
  ...delegatedProps
} = defineProps<TagsInputProps<T>>();

const emit = defineEmits<TagsInputEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <STagsInputRoot v-bind="forwarded" :class="cls || ui?.root" :size="size">
    <template v-for="item in modelValue" :key="item">
      <slot name="item" :value="item">
        <STagsInputItem
          :class="ui?.item"
          :size="size"
          :value="item"
          :disabled="disabled || disabledValue?.includes(item)"
        >
          <STagsInputItemText :class="ui?.itemText" :size="size" />
          <STagsInputItemDelete :class="ui?.itemDelete" :icon-class="ui?.itemDeleteIcon" :size="size">
            <slot name="item-delete-icon" :value="item" />
          </STagsInputItemDelete>
        </STagsInputItem>
      </slot>
    </template>
    <STagsInputInput
      :class="ui?.input"
      :placeholder="placeholder"
      :auto-focus="autoFocus"
      :max-length="maxLength"
      :size="size"
    />
  </STagsInputRoot>
</template>
