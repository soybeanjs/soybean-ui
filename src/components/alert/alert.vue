<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { AlertClose, AlertContent, AlertDescription, AlertRoot, AlertTitle, provideAlertUi } from '@soybeanjs/headless';
import { mergeSlotVariants } from '@/theme';
import { alertVariants } from '@/variants/alert';
import ButtonIcon from '../button/button-icon.vue';
import Icon from '../icon/icon.vue';
import type { AlertEmits, AlertProps } from './types';

defineOptions({
  name: 'SAlert'
});

const props = withDefaults(defineProps<AlertProps>(), {
  open: undefined
});

const emit = defineEmits<AlertEmits>();

const slots = useSlots();

const ui = computed(() => {
  const variants = alertVariants({
    size: props.size,
    color: props.color,
    variant: props.variant
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideAlertUi(ui);
</script>

<template>
  <AlertRoot :open="open" @update:open="value => emit('update:open', value)">
    <slot name="leading">
      <Icon v-if="icon" :icon="icon" :class="ui.icon" />
    </slot>
    <AlertContent v-bind="contentProps">
      <AlertTitle v-if="slots.title || title" v-bind="titleProps">
        <slot name="title">{{ title }}</slot>
      </AlertTitle>
      <AlertDescription v-if="slots.description || description" v-bind="descriptionProps">
        <slot name="description">{{ description }}</slot>
      </AlertDescription>
      <slot />
    </AlertContent>
    <slot name="trailing" />
    <AlertClose v-if="closable" v-bind="closeProps" as-child>
      <slot name="close">
        <ButtonIcon icon="lucide:x" :size="size" />
      </slot>
    </AlertClose>
  </AlertRoot>
</template>
