<script setup lang="ts">
import { useControllableState } from '../../composables';
import { provideBadgeRootContext, useBadgeUi } from './context';
import type { BadgeRootProps, BadgeRootEmits } from './types';

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
    emit('update:open', value);
  },
  true
);

provideBadgeRootContext({
  open
});
</script>

<template>
  <div data-soybean-badge-root :class="cls">
    <slot />
  </div>
</template>
