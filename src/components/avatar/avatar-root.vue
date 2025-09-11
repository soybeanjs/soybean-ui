<script setup lang="ts">
import { computed } from 'vue';
import { provideAvatarRootContext, useAvatarThemeContext } from './context';
import type { AvatarRootProps } from './types';

defineOptions({
  name: 'AvatarRoot'
});

const props = defineProps<AvatarRootProps>();

const themeContext = useAvatarThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

provideAvatarRootContext();
</script>

<template>
  <span v-bind="props" :class="cls">
    <slot />
  </span>
</template>
