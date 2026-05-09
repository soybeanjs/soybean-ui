<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Button from '../button/button.vue';
import { usePageTabsUi, usePageTabsItemContext } from './context';
import type { PageTabsPinProps } from './types';

defineOptions({
  name: 'PageTabsPin'
});

const props = defineProps<PageTabsPinProps>();

const attrs = useAttrs();

const cls = usePageTabsUi('pin');

const { pinned, onPin } = usePageTabsItemContext('PageTabsPin');

const ariaLabel = computed(() => (attrs['aria-label'] as string) ?? (pinned.value ? 'Unpin tab' : 'Pin tab'));
</script>

<template>
  <Button
    v-if="pinned"
    v-bind="props"
    :aria-label="ariaLabel"
    :class="cls"
    data-slot="pin"
    tabindex="-1"
    @click.stop="onPin"
  >
    <slot />
  </Button>
</template>
