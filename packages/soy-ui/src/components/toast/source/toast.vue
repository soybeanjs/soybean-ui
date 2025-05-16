<script setup lang="ts">
import { isVNode } from 'vue';
import type { FunctionalComponent } from 'vue';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next';
import type { LucideProps } from 'lucide-vue-next';
import { useToast } from '../context';
import type { ToastIconType, ToastProps } from '../types';
import SToastRoot from './toast-root.vue';
import SToastViewport from './toast-viewport.vue';
import SToastTitle from './toast-title.vue';
import SToastDescription from './toast-description.vue';
import SToastClose from './toast-close.vue';

defineOptions({
  name: 'SToast'
});

const { class: cls, size, ui } = defineProps<ToastProps>();

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
  <SToastRoot
    v-for="toast in toasts"
    :key="toast.id"
    :class="cls || ui?.root"
    v-bind="toast"
    @update:open="toast.onOpenChange"
  >
    <div class="grid gap-1">
      <SToastTitle v-if="toast.title" :class="ui?.title" :size="size">
        <template v-if="toast.iconType" #title-leading>
          <component :is="iconRecord[toast.iconType].icon" :class="iconRecord[toast.iconType].class" />
        </template>
        {{ toast.title }}
      </SToastTitle>
      <template v-if="toast.description">
        <SToastDescription v-if="isVNode(toast.description)" :class="ui?.description">
          <component :is="toast.description" />
        </SToastDescription>
        <SToastDescription v-else :class="ui?.description">
          {{ toast.description }}
        </SToastDescription>
      </template>
      <SToastClose :class="ui?.close" :size="size" />
    </div>
    <component :is="toast.action" :class="ui?.action" />
  </SToastRoot>
  <SToastViewport />
</template>
