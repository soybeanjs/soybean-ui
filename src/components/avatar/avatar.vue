<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { AvatarCompact, provideAvatarUi } from '@soybeanjs/headless/avatar';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { avatarVariants } from './variants';
import type { AvatarProps, AvatarEmits } from './types';

defineOptions({
  name: 'SAvatar'
});

const props = defineProps<AvatarProps>();

const emit = defineEmits<AvatarEmits>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = avatarVariants({ size: props.size });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideAvatarUi(ui);
</script>

<template>
  <AvatarCompact v-bind="forwardedProps" @loading-status-change="emit('loadingStatusChange', $event)">
    <template v-for="slotName in slotNames" #[slotName]>
      <slot :name="slotName" />
    </template>
  </AvatarCompact>
</template>
