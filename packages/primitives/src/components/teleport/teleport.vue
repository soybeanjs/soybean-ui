<script setup lang="ts">
import { computed } from 'vue';
import { useMounted } from '@vueuse/core';
import type { TeleportProps } from './types';

defineOptions({
  name: 'TeleportPrimitive'
});

const props = withDefaults(defineProps<TeleportProps>(), {
  forceMount: false,
  to: 'body',
  disabled: false
});

const isMounted = useMounted();

const showTeleport = computed(() => isMounted.value || props.forceMount);
</script>

<template>
  <Teleport v-if="showTeleport" :disabled="disabled" :to="to">
    <slot />
  </Teleport>
</template>
