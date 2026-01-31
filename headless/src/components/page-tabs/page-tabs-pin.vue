<script setup lang="ts">
import { Primitive } from '../primitive';
import { usePageTabsUi, usePageTabsItemContext } from './context';
import type { PageTabsPinProps } from './types';

defineOptions({
  name: 'PageTabsPin'
});

const props = defineProps<PageTabsPinProps>();

const cls = usePageTabsUi('pin');

const { pinned, onPin } = usePageTabsItemContext('PageTabsPin');
</script>

<template>
  <Primitive v-if="pinned" :as="as" :as-child="asChild" :class="cls" @click.stop="onPin">
    <slot />
  </Primitive>
</template>
