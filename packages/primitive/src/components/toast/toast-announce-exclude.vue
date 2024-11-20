<script setup lang="ts">
import { Primitive } from '../primitive';
import type { ToastAnnounceExcludePropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastAnnounceExclude'
});

defineProps<ToastAnnounceExcludePropsWithPrimitive>();
</script>

<template>
  <Primitive
    :as
    :as-child
    data-soybean-toast-announce-exclude=""
    :data-soybean-toast-announce-alt="altText || undefined"
  >
    <slot />
  </Primitive>
</template>
