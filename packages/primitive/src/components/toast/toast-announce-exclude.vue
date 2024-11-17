<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';

export interface ToastAnnounceExcludeProps extends PrimitiveProps {
  altText?: string;
}

defineProps<ToastAnnounceExcludeProps>();
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
