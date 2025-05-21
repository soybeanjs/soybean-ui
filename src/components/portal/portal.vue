<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { PortalProps } from './types';

defineProps<PortalProps>();

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <Teleport v-if="isMounted || forceMount" :to="to" :disabled="disabled" :defer="defer">
    <slot />
  </Teleport>
</template>
