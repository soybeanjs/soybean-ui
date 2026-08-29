<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { useFlip } from '../../composables';
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

// Any nested change (error message toggling, description visibility, field array
// edits) shifts the sibling fields; FLIP keeps that reflow smooth.
const { setTarget: setFormEl } = useFlip();

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
  <form :ref="setFormEl" data-soybean-form :class="cls" :data-orientation="orientation">
    <slot />
  </form>
</template>
