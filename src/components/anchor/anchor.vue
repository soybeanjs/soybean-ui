<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { AnchorRoot, provideAnchorUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import AnchorItem from './anchor-item.vue';
import type { AnchorEmits, AnchorProps } from './types';
import { anchorVariants } from './variants';

defineOptions({
  name: 'SAnchor'
});

const props = withDefaults(defineProps<AnchorProps>(), {
  color: 'primary',
  linkProps: undefined,
  modelValue: undefined,
  offsetTop: 0,
  size: 'md',
  sticky: true,
  ui: undefined
});

const emit = defineEmits<AnchorEmits>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'items', 'linkProps', 'size', 'sticky', 'ui']);

const style = computed<CSSProperties>(() => ({
  '--soybean-anchor-offset-top': `${props.offsetTop}px`
}));

const ui = computed(() => {
  const variants = anchorVariants({
    color: props.color,
    orientation: props.orientation,
    size: props.size,
    sticky: props.sticky
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideAnchorUi(ui);
</script>

<template>
  <AnchorRoot
    v-slot="{ modelValue }"
    v-bind="forwardedProps"
    :style="style"
    @update:model-value="emit('update:modelValue', $event)"
    @active-change="emit('activeChange', $event)"
    @item-select="(event, payload) => emit('itemSelect', event, payload)"
  >
    <AnchorItem
      v-for="item in items"
      :key="item.href"
      :item="item"
      :link-props="linkProps"
      :model-value="modelValue"
      :ui="ui"
    />
  </AnchorRoot>
</template>
