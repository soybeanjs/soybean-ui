<script setup lang="ts">
import { Primitive } from '../primitive';
import type { ToastAnnounceExcludePropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastAnnounceExclude'
});

const props = defineProps<ToastAnnounceExcludePropsWithPrimitive>();
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :data-soybean-toast-announce-alt="altText || undefined"
    data-soybean-toast-announce-exclude=""
  >
    <slot />
  </Primitive>
</template>
