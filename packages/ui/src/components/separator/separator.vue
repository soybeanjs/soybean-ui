<script setup lang="ts">
import { computed } from 'vue';
import { Separator } from 'radix-vue';
import { cn, separatorVariants } from '@soybean-ui/variants';
import type { SeparatorProps } from './types';

defineOptions({
  name: 'SSeparator'
});

const props = defineProps<SeparatorProps>();

const delegatedProps = computed(() => {
  const {
    class: _class,
    dashed: _dashed,
    labelClass: _labelClass,
    labelStyle: _labelStyle,
    type: _type,
    orientationMargin: _orientationMargin,
    orientation: _orientation,
    ...delegated
  } = props;

  return delegated;
});

const cls = computed(() => {
  const { separator } = separatorVariants({ type: props.type, dashed: props.dashed });

  return cn(separator(), props.class);
});

const style = computed(() => {
  const orientationMargin =
    props.orientation !== 'center'
      ? { [props.orientation === 'left' ? 'left' : 'right']: `${props.orientationMargin}px` }
      : {};

  return Object.assign(orientationMargin, props.labelStyle);
});

const labelClass = computed(() => {
  const { label } = separatorVariants({ type: props.type, orientation: props.orientation, plain: props.plain });

  return cn(label(), props.labelClass);
});
</script>

<template>
  <Separator v-bind="delegatedProps" :class="cls">
    <span v-if="props.label" :style="style" :class="labelClass">
      {{ props.label }}
    </span>
  </Separator>
</template>
