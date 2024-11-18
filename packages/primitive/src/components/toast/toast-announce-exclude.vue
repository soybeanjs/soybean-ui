<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';

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
