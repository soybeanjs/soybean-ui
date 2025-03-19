<script setup lang="ts">
import { isVNode } from 'vue';
import type { FunctionalComponent } from 'vue';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next';
import type { LucideProps } from 'lucide-vue-next';
import { useToast } from './context';
import SToastRoot from './toast-root.vue';
import SToastViewport from './toast-viewport.vue';
import SToastTitle from './toast-title.vue';
import SToastDescription from './toast-description.vue';
import SToastClose from './toast-close.vue';
import type { ToastIconType } from './types';

defineOptions({
  name: 'SToast'
});

const { toasts } = useToast();

const iconRecord: Record<ToastIconType, { icon: FunctionalComponent<LucideProps>; class: string }> = {
  destructive: {
    icon: CircleX,
    class: 'text-destructive'
  },
  success: {
    icon: CircleCheck,
    class: 'text-success'
  },
  warning: {
    icon: CircleAlert,
    class: 'text-warning'
  },
  info: {
    icon: Info,
    class: 'text-info'
  }
};
</script>

<template>
  <SToastRoot v-for="toast in toasts" :key="toast.id" v-bind="toast" @update:open="toast.onOpenChange">
    <div class="grid gap-1">
      <SToastTitle v-if="toast.title">
        <template v-if="toast.iconType" #title-leading>
          <component :is="iconRecord[toast.iconType].icon" :class="iconRecord[toast.iconType].class" />
        </template>
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
