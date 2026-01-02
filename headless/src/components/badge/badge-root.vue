<script setup lang="ts">
import { useControllableState } from '../../composables';
import { provideBadgeRootContext, useBadgeUi } from './context';
import type { BadgeRootEmits, BadgeRootProps } from './types';

defineOptions({
  name: 'BadgeRoot'
});

const props = withDefaults(defineProps<BadgeRootProps>(), {
  open: undefined
});

const emit = defineEmits<BadgeRootEmits>();

const cls = useBadgeUi('root');

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  true
);

provideBadgeRootContext({
  open
});
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
