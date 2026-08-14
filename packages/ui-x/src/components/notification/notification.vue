<script setup lang="ts">
import { computed } from 'vue';
import { notificationVariants } from '../../styles/notification';
import type { NotificationProps } from './types';

defineOptions({
  name: 'SxNotification'
});

const props = withDefaults(defineProps<NotificationProps>(), {
  title: '',
  description: '',
  type: 'info',
  closable: true,
  onClose: undefined
});

const emit = defineEmits<{
  close: [];
}>();

const iconMap: Record<string, string> = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌'
};

const variants = computed(() => notificationVariants({ type: props.type }));

const ui = computed(() => ({
  root: [variants.value.root, props.class],
  icon: variants.value.icon,
  body: variants.value.body,
  title: variants.value.title,
  description: variants.value.description,
  close: variants.value.close
}));

function close(): void {
  props.onClose?.();
  emit('close');
}
</script>

<template>
  <div :class="ui.root" role="status">
    <span :class="ui.icon" aria-hidden="true">
      <slot name="icon" :type="type">{{ iconMap[type] }}</slot>
    </span>
    <div :class="ui.body">
      <div :class="ui.title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" :class="ui.description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <button v-if="closable" type="button" :class="ui.close" aria-label="Close" @click="close">
      <slot name="close-icon"><span aria-hidden="true">✕</span></slot>
    </button>
  </div>
</template>
