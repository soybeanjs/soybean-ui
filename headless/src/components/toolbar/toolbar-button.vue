<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { RovingFocusItem } from '../roving-focus';
import { Button } from '../button';
import { useToolbarUi } from './context';
import type { ToolbarButtonEmits, ToolbarButtonProps } from './types';

defineOptions({
  name: 'ToolbarButton'
});

const props = defineProps<ToolbarButtonProps>();

const emit = defineEmits<ToolbarButtonEmits>();

const cls = useToolbarUi('button');

const forwardedProps = useOmitProps(props, ['class']);

const mergedClass = computed(() => [cls.value, props.class]);
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled">
    <Button v-bind="forwardedProps" :class="mergedClass" @click="emit('click', $event)">
      <slot />
    </Button>
  </RovingFocusItem>
</template>
