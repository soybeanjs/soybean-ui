<script setup lang="ts">
import { computed } from 'vue';
import { TagsInputCompact, provideTagsInputUi } from '@soybeanjs/headless/tags-input';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants, miniSizeMap } from '@/theme';
import { buttonIconVariants } from '../button/variants';
import { tagsInputVariants } from './variants';
import type { TagsInputProps, TagsInputEmits, TagsInputSlots } from './types';

defineOptions({
  name: 'STagsInput'
});

const props = defineProps<TagsInputProps>();

const emit = defineEmits<TagsInputEmits>();

const slots = defineSlots<TagsInputSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const miniSize = miniSizeMap[props.size || 'md'];

  const variants = Object.assign(
    tagsInputVariants({
      size: props.size
    }),
    {
      $base: {
        itemDelete: buttonIconVariants({ size: miniSize, shape: 'circle' }),
        clear: buttonIconVariants({ size: props.size })
      }
    }
  );

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideTagsInputUi(ui);
</script>

<template>
  <TagsInputCompact v-bind="forwardedProps" v-on="listeners">
    <template v-if="slots.item" #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
  </TagsInputCompact>
</template>
