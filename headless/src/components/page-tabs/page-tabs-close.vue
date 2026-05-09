<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Button from '../button/button.vue';
import { usePageTabsUi, usePageTabsItemContext } from './context';
import type { PageTabsCloseProps } from './types';

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
    :class="cls"
    :aria-label="ariaLabel"
    data-slot="close"
    tabindex="-1"
    @click.stop="onClose"
  >
    <slot />
  </Button>
</template>
