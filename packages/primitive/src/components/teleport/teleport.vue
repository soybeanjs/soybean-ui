<script setup lang="ts">
import { computed } from 'vue';
import { useMounted } from '@vueuse/core';
import type { TeleportProps } from './types';

defineOptions({
  name: 'TeleportPrimitive'
});

const { forceMount = false, to = 'body', disabled = false } = defineProps<TeleportProps>();

const isMounted = useMounted();

const showTeleport = computed(() => isMounted.value || forceMount);
</script>

<template>
  <Teleport v-if="showTeleport" :to :disabled>
    <slot />
  </Teleport>
</template>
