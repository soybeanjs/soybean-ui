<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@headless/composables';
import { cn } from '@theme';
import { buttonIconVariants } from '@variants/button';
import Icon from '../icon/icon.vue';
import Button from './button.vue';
import type { ButtonIconProps } from './types';

defineOptions({
  name: 'SButtonIcon'
});

const props = withDefaults(defineProps<ButtonIconProps>(), {
  color: 'accent',
  variant: 'ghost',
  shape: 'square'
});

const forwardedProps = useOmitProps(props, ['icon', 'iconProps']);

const cls = computed(() => {
  const variants = buttonIconVariants({
    size: props.size
  });

  return cn(variants, props.class);
});
</script>

<template>
  <Button v-bind="forwardedProps" :class="cls">
    <Icon :icon="icon" v-bind="iconProps" />
  </Button>
</template>
