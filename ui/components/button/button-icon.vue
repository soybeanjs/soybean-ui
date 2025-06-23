<script setup lang="ts">
import { useOmitProps } from '@headless/composables';
import Icon from '../icon/icon.vue';
import Button from './button.vue';
import type { ButtonIconProps } from './types';

defineOptions({
  name: 'SButtonIcon'
});

const props = withDefaults(defineProps<ButtonIconProps>(), {
  color: 'accent',
  variant: 'ghost',
  shape: 'square',
  fitContent: true
});

const forwardedProps = useOmitProps(props, ['icon', 'iconProps']);
</script>

<template>
  <Button v-bind="forwardedProps">
    <Icon :icon="icon" v-bind="iconProps" />
  </Button>
</template>
