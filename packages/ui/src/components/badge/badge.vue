<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { BadgeCompact, provideBadgeUi } from '@soybeanjs/headless/badge';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { badgeVariants } from '@/styles/badge';
import type { BadgeProps, BadgeEmits } from './types';

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

const ui = computed(() =>
  badgeVariants(
    {
      color: props.color,
      size: props.size,
      position: props.position
    },
    props.ui,
    { root: props.class }
  )
);

provideBadgeUi(ui);
</script>

<template>
  <BadgeCompact v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <template v-for="slotName in slotNames" #[slotName]>
      <slot :name="slotName" />
    </template>
  </BadgeCompact>
</template>
