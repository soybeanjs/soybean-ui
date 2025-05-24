<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { PortalProps } from './types';

defineOptions({
  name: 'Portal'
});

withDefaults(defineProps<PortalProps>(), {
  to: 'body'
});

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
