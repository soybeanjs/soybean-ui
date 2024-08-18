<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'radix-vue';
import { alertVariants, cn } from '@soybean-unify/ui-variants';
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

const props = defineProps<AlertProps>();

const close = defineModel<boolean>('close', { default: false });

const delegatedProps = reactiveOmit(props, [
  'title',
  'headerProps',
  'titleRootProps',
  'titleProps',
  'description',
  'descriptionProps',
  'closable'
]);

const forwarded = useForwardProps(delegatedProps);

const { titleRoot } = alertVariants();

const titleRootProps = computed(() => {
  const { class: cls, ...rest } = props.titleRootProps || {};

  return {
    class: cn(titleRoot({ color: props.color }), cls),
    ...rest
  };
});

function closeAlert() {
  close.value = true;
}
</script>

<template>
  <SAlertRoot v-show="!close" v-bind="forwarded">
    <SAlertHeader>
      <SAlertTitleRoot v-bind="titleRootProps">
        <slot name="icon"></slot>
        <SAlertTitle v-bind="titleProps">
          <slot>{{ title }}</slot>
        </SAlertTitle>
      </SAlertTitleRoot>
      <slot name="extra">
        <SButtonIcon v-if="closable" size="xs" fit-content @click="closeAlert">
          <X />
        </SButtonIcon>
      </slot>
    </SAlertHeader>
    <SAlertDescription v-if="$slots.description || description" v-bind="descriptionProps">
      <slot name="description">{{ description }}</slot>
    </SAlertDescription>
  </SAlertRoot>
</template>

<style scoped></style>
