<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { BadgeCompact, provideBadgeUi } from '@soybeanjs/headless/badge';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { badgeVariants } from './variants';
import type { BadgeEmits, BadgeProps } from './types';

defineOptions({
  name: 'SBadge'
});

const props = withDefaults(defineProps<BadgeProps>(), {
  open: undefined
});

const emit = defineEmits<BadgeEmits>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui', 'position']);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = badgeVariants({
    color: props.color,
    size: props.size,
    position: props.position
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideBadgeUi(ui);
</script>

<template>
  <BadgeCompact v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <template v-for="slotName in slotNames" #[slotName]>
      <slot :name="slotName" />
    </template>
  </BadgeCompact>
</template>
