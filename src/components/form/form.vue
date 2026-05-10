<script setup lang="ts">
import { computed } from 'vue';
import { FormCompact, provideFormUi } from '@soybeanjs/headless/form';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { formVariants } from './variants';
import type { FormProps } from './types';

defineOptions({
  name: 'SForm'
});

const props = defineProps<FormProps>();

const forwardedProps = useOmitProps(props, ['ui', 'class', 'size']);

const ui = computed(() => {
  const variants = formVariants({
    size: props.size
  });

  return mergeVariants(variants, props.ui, { form: props.class });
});

provideFormUi(ui);
</script>

<template>
  <FormCompact v-bind="forwardedProps">
    <slot />
  </FormCompact>
</template>
