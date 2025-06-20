<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { provideSelectGroupContext, useSelectThemeContext } from './context';
import type { SelectGroupProps } from './types';

defineOptions({
  name: 'SelectGroup'
});

const props = defineProps<SelectGroupProps>();

const { labelId, initLabelId } = provideSelectGroupContext();

const themeContext = useSelectThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.group, props.class]);

initLabelId();
</script>

<template>
  <Primitive v-bind="props" :class="cls" :aria-labelledby="labelId" role="group">
    <slot />
  </Primitive>
</template>
