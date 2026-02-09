<script setup lang="ts">
import { computed } from 'vue';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { cn } from '@/theme';
import { formVariants } from './variants';
import { provideFormContext } from './context';
import type { FormProps } from './types';

defineOptions({
  name: 'SForm'
});

const props = defineProps<FormProps>();

const cls = computed(() => {
  const { form } = formVariants({
    size: props.size
  });

  return cn(form(), props.class);
});

provideFormContext(transformPropsToContext(props));
</script>

<template>
  <form :class="cls">
    <slot />
  </form>
</template>
