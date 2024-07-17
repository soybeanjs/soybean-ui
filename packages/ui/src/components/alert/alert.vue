<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'radix-vue';
import SAlertRoot from './alert-root.vue';
import SAlertTitle from './alert-title.vue';
import SAlertDescription from './alert-description.vue';
import type { AlertProps } from './types';

defineOptions({
  name: 'SAlert'
});

const props = defineProps<AlertProps>();

const delegatedProps = reactiveOmit(props, ['title', 'titleProps', 'description', 'descriptionProps', 'icon']);

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <SAlertRoot v-bind="forwarded">
    <slot name="icon">
      <component :is="icon" v-if="icon" />
    </slot>
    <SAlertTitle v-bind="titleProps">
      <slot>{{ title }}</slot>
    </SAlertTitle>
    <SAlertDescription v-bind="descriptionProps">
      <slot name="description">{{ description }}</slot>
    </SAlertDescription>
  </SAlertRoot>
</template>

<style scoped></style>
