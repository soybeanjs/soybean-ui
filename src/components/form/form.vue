<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { FormCompact, provideFormUi } from '@soybeanjs/headless/form';
import { formVariants } from '@/styles/form';
import type { FormProps } from './types';

defineOptions({
  name: 'SForm'
});

const props = defineProps<FormProps>();

const forwardedProps = useOmitProps(props, ['ui', 'class', 'size']);

const ui = computed(() => formVariants({ size: props.size }, props.ui, { form: props.class }));

provideFormUi(ui);
</script>

<template>
  <FormCompact v-bind="forwardedProps">
    <slot />
  </FormCompact>
</template>
