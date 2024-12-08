<script setup lang="ts">
import { isVNode } from 'vue';
import { useToast } from './context';
import SToastRoot from './toast-root.vue';
import SToastViewport from './toast-viewport.vue';
import SToastTitle from './toast-title.vue';
import SToastDescription from './toast-description.vue';
import SToastClose from './toast-close.vue';

defineOptions({
  name: 'SToast'
});

const { toasts } = useToast();
</script>

<template>
  <SToastRoot v-for="toast in toasts" :key="toast.id" v-bind="toast" @update:open="toast.onOpenChange">
    <div class="grid gap-1">
      <SToastTitle v-if="toast.title">
        {{ toast.title }}
      </SToastTitle>
      <template v-if="toast.description">
        <SToastDescription v-if="isVNode(toast.description)">
          <component :is="toast.description" />
        </SToastDescription>
        <SToastDescription v-else>
          {{ toast.description }}
        </SToastDescription>
      </template>
      <SToastClose />
    </div>
    <component :is="toast.action" />
  </SToastRoot>
  <SToastViewport />
</template>

<style scoped></style>
