<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useSwitchRootContext, useSwitchThemeContext } from './context';
import type { SwitchThumbProps } from './types';

defineOptions({
  name: 'SwitchThumb'
});

withDefaults(defineProps<SwitchThumbProps>(), {
  as: 'span'
});

const { dataState, dataDisabled } = useSwitchRootContext('SwitchThumb');

const themeContext = useSwitchThemeContext();

const cls = computed(() => themeContext?.ui?.value?.thumb);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :data-disabled="dataDisabled" :data-state="dataState">
    <slot />
  </Primitive>
</template>
