<script setup lang="ts">
import { X } from 'lucide-vue-next';
import SButtonIcon from '../button/button-icon.vue';
import SAlertRoot from './alert-root.vue';
import SAlertHeader from './alert-header.vue';
import SAlertTitleRoot from './alert-title-root.vue';
import SAlertTitle from './alert-title.vue';
import SAlertDescription from './alert-description.vue';
import type { AlertProps } from './types';

defineOptions({
  name: 'SAlert'
});

const { class: rootCls, color, variant } = defineProps<AlertProps>();

const close = defineModel<boolean>('close', { default: false });

function closeAlert() {
  close.value = true;
}
</script>

<template>
  <SAlertRoot v-show="!close" :class="rootCls" :color :variant>
    <SAlertHeader :class="headerClass">
      <SAlertTitleRoot :class="titleRootClass" :color>
        <slot name="icon" />
        <SAlertTitle :class="titleClass">
          <slot>{{ title }}</slot>
        </SAlertTitle>
      </SAlertTitleRoot>
      <slot name="extra" :closable>
        <SButtonIcon v-if="closable" size="xs" fit-content @click="closeAlert">
          <X />
        </SButtonIcon>
      </slot>
    </SAlertHeader>
    <SAlertDescription v-if="$slots.description || description" :class="descriptionClass">
      <slot name="description">{{ description }}</slot>
    </SAlertDescription>
  </SAlertRoot>
</template>
