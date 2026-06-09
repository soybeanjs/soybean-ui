<script setup lang="ts">
import { useOmitProps } from '../../composables';
import BadgeContent from './badge-content.vue';
import BadgeRoot from './badge-root.vue';
import type { BadgeCompactProps, BadgeCompactEmits, BadgeCompactSlots } from './types';

defineOptions({
  name: 'BadgeCompact'
});

const props = withDefaults(defineProps<BadgeCompactProps>(), {
  open: undefined
});

const emit = defineEmits<BadgeCompactEmits>();

defineSlots<BadgeCompactSlots>();

const forwardedProps = useOmitProps(props, ['content', 'contentProps']);
</script>

<template>
  <BadgeRoot v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <slot />
    <BadgeContent v-bind="contentProps">
      <slot name="content">{{ content }}</slot>
    </BadgeContent>
  </BadgeRoot>
</template>
