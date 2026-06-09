<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { provideFormCompactContext, useFormUi } from './context';
import type { FormCompactProps } from './types';
import { provideFormSub } from './use-form';

defineOptions({
  name: 'SFormCompact'
});

const props = withDefaults(defineProps<FormCompactProps>(), {
  orientation: 'vertical'
});

const cls = useFormUi('form');

provideFormCompactContext({
  ...transformPropsToContext(props, [
    'orientation',
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
  <form data-soybean-form :class="cls" :data-orientation="orientation">
    <slot />
  </form>
</template>
