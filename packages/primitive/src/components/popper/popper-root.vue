<script lang="ts">
import type { Ref } from 'vue';
import type { ReferenceElement } from '@floating-ui/vue';
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { createContext } from '../../_shared';

export interface Measurable {
  getBoundingClientRect: () => DOMRect;
}

interface PopperRootContext {
  anchor: Ref<ReferenceElement | undefined>;
  onAnchorChange: (element: ReferenceElement | undefined) => void;
}

export const [injectPopperRootContext, providePopperRootContext] = createContext<PopperRootContext>('PopperRoot');

defineOptions({
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
