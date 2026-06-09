<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Button from '../button/button.vue';
import { usePageTabsUi, usePageTabsItemContext } from './context.js';
import type { PageTabsCloseProps } from './types.js';

defineOptions({
  name: 'PageTabsClose'
});

const props = defineProps<PageTabsCloseProps>();

const attrs = useAttrs();

const cls = usePageTabsUi('close');

const { closable, onClose } = usePageTabsItemContext('PageTabsClose');

const ariaLabel = computed(() => (attrs['aria-label'] as string) ?? 'Close tab');
</script>

<template>
  <Button
    v-if="closable"
    v-bind="props"
    data-soybean-page-tabs-close
    :class="cls"
    :aria-label="ariaLabel"
    tabindex="-1"
    @click.stop="onClose"
  >
    <slot />
  </Button>
</template>
