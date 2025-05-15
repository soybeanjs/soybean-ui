<script setup lang="ts">
import { computed } from 'vue';
import { Slot } from '@soybean-ui/primitives';
import { alertVariants, cn } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import SButtonIcon from '../../button/source/button-icon.vue';
import type { AlertProps } from '../types';
import SAlertRoot from './alert-root.vue';
import SAlertWrapper from './alert-wrapper.vue';
import SAlertTitle from './alert-title.vue';
import SAlertDescription from './alert-description.vue';

defineOptions({
  name: 'SAlert'
});

const { class: cls, color, variant, size, ui } = defineProps<AlertProps>();

const mergedCls = computed(() => {
  const { icon, close } = alertVariants({ color, variant, size });

  return {
    icon: cn(icon(), ui?.icon),
    close: cn(close(), ui?.close)
  };
});

const close = defineModel<boolean>('close', { default: false });

function closeAlert() {
  close.value = true;
}
</script>

<template>
  <SAlertRoot v-if="!close" :class="cls || ui?.root" :color="color" :variant="variant" :size="size">
    <slot name="leading">
      <Slot :class="mergedCls.icon">
        <slot name="icon" />
      </Slot>
    </slot>
    <SAlertWrapper :class="ui?.wrapper" :size="size">
      <SAlertTitle v-if="$slots.title || title" :class="ui?.title" :size="size">
        <slot name="title">{{ title }}</slot>
      </SAlertTitle>
      <SAlertDescription v-if="$slots.description || description" :class="ui?.description" :size="size">
        <slot name="description">{{ description }}</slot>
      </SAlertDescription>
      <slot />
    </SAlertWrapper>
    <slot name="trailing" />
    <slot name="close">
      <Slot :class="mergedCls.close" :size="size">
        <SButtonIcon v-if="closable" fit-content @click="closeAlert">
          <X />
        </SButtonIcon>
      </Slot>
    </slot>
  </SAlertRoot>
</template>
