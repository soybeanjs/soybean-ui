<script setup lang="ts">
import { Primitive } from '../primitive';
import { usePageTabsUi, usePageTabsItemContext } from './context';
import type { PageTabsCloseProps } from './types';

defineOptions({
  name: 'PageTabsClose'
});

const props = defineProps<PageTabsCloseProps>();

const cls = usePageTabsUi('close');

const { closable, pinned, onClose } = usePageTabsItemContext('PageTabsClose');
</script>

<template>
  <Primitive v-if="closable && !pinned" :as="as" :as-child="asChild" :class="cls" @click.stop="onClose">
    <slot />
  </Primitive>
</template>
