<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { provideFormCompactContext, useFormUi } from './context';
import { provideFormSub } from './use-form';
import type { FormCompactProps } from './types';

defineOptions({
  name: 'SFormCompact'
});

const props = defineProps<FormCompactProps>();

const cls = useFormUi('form');

provideFormCompactContext({
  ...transformPropsToContext(props, [
    'inline',
    'fieldProps',
    'fieldArrayProps',
    'labelProps',
    'controlProps',
    'descriptionProps',
    'errorProps'
  ])
});

provideFormSub();
</script>

<template>
  <form :class="cls" :data-inline="inline ? '' : undefined">
    <slot />
  </form>
</template>
