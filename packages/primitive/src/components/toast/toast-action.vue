<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import type { ToastCloseProps } from './toast-close.vue';

import ToastAnnounceExclude from './toast-announce-exclude.vue';
import ToastClose from './toast-close.vue';

export interface ToastActionProps extends ToastCloseProps {
  /**
   * A short description for an alternate way to carry out the action. For screen reader users who will not be able to
   * navigate to the button easily/quickly.
   *
   * @example
   *   <ToastAction altText="Goto account settings to upgrade">Upgrade</ToastAction>;
   *
   * @example
   *   <ToastAction altText="Undo (Alt+U)">Undo</ToastAction>;
   */
  altText: string;
}

const props = defineProps<ToastActionProps>();

if (!props.altText) throw new Error('Missing prop `altText` expected on `ToastAction`');

const { forwardRef } = useForwardExpose();
</script>

<template>
  <ToastAnnounceExclude v-if="altText" :alt-text="altText" as-child>
    <ToastClose :ref="forwardRef" :as :as-child>
      <slot />
    </ToastClose>
  </ToastAnnounceExclude>
</template>
