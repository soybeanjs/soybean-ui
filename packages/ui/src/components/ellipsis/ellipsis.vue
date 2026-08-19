<script setup lang="ts">
import { computed, ref } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { EllipsisRoot } from '@soybeanjs/headless/ellipsis';
import { ellipsisVariants } from '@/styles/ellipsis';
import { STooltip } from '../tooltip';
import type { EllipsisProps, EllipsisEmits } from './types';

defineOptions({
  name: 'SEllipsis'
});

const props = withDefaults(defineProps<EllipsisProps>(), {
  as: 'span',
  lines: 1,
  expandable: false,
  expanded: undefined,
  defaultExpanded: false,
  tooltip: true
});

const emit = defineEmits<EllipsisEmits>();

const forwardedProps = useOmitProps(props, ['class', 'tooltipContent']);

const cls = computed(() => ellipsisVariants({ lines: props.lines }, props.class));

const ellipsisRef = ref<InstanceType<typeof EllipsisRoot>>();

const showTooltip = computed(() => {
  if (!props.tooltip || props.expandable) return false;

  return !!(ellipsisRef.value?.overflowed && !ellipsisRef.value?.expanded);
});

const tooltipContent = computed(() => props.tooltipContent ?? ellipsisRef.value?.text ?? '');
</script>

<template>
  <STooltip :content="tooltipContent" :disabled="!showTooltip">
    <template #trigger>
      <EllipsisRoot
        ref="ellipsisRef"
        v-bind="forwardedProps"
        :class="cls"
        @update:expanded="emit('update:expanded', $event)"
      >
        <slot />
      </EllipsisRoot>
    </template>
  </STooltip>
</template>
