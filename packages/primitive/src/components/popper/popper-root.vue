<script setup lang="ts">
import { ref } from 'vue';
import type { ReferenceElement } from '@floating-ui/vue';
import { providePopperRootContext } from './context';

defineOptions({
  name: 'PopperRoot',
  inheritAttrs: false
});

const anchor = ref<ReferenceElement>();

providePopperRootContext({
  anchor,
  onAnchorChange: element => (anchor.value = element)
});
</script>

<template>
  <slot />
</template>
