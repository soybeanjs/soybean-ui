<script setup lang="ts" generic="T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '../../types';
import { useOmitProps } from '../../composables';
import { ToggleGroupItem } from '../toggle-group';
import ToolbarButton from './toolbar-button.vue';
import { useToolbarUi } from './context';
import type { ToolbarToggleItemProps } from './types';

defineOptions({
  name: 'ToolbarToggleItem'
});

const props = defineProps<ToolbarToggleItemProps<T>>();

const cls = useToolbarUi('toggleItem');

const forwardedProps = useOmitProps(props, ['class']);

const mergedClass = computed(() => [cls.value, props.class]);
</script>

<template>
  <ToolbarButton as-child :class="mergedClass">
    <ToggleGroupItem v-bind="forwardedProps">
      <slot />
    </ToggleGroupItem>
  </ToolbarButton>
</template>
