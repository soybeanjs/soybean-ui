<script setup lang="ts">
import { computed } from 'vue';
import { appFooterVariants } from '@/styles/app-footer';
import type { AppFooterProps } from './types';

defineOptions({
  name: 'SAppFooter'
});

const props = withDefaults(defineProps<AppFooterProps>(), {
  text: undefined,
  showCopyright: false
});

const ui = computed(() => appFooterVariants({}, { root: props.class }));
</script>

<template>
  <footer :class="ui.root">
    <slot />
    <span v-if="text">{{ text }}</span>
    <span v-if="showCopyright">Copyright © {{ new Date().getFullYear() }}</span>
  </footer>
</template>
