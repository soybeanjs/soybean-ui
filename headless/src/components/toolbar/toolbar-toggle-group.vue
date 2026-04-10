<script setup lang="ts" generic="M extends boolean = false, T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '../../types';
import { useForwardListeners, useOmitProps } from '../../composables';
import { ToggleGroupRoot } from '../toggle-group';
import { useToolbarRootContext, useToolbarUi } from './context';
import type { ToolbarToggleGroupEmits, ToolbarToggleGroupProps } from './types';

defineOptions({
  name: 'ToolbarToggleGroup'
});

const props = defineProps<ToolbarToggleGroupProps<M, T>>();

const emit = defineEmits<ToolbarToggleGroupEmits<M, T>>();

const { orientation, dir } = useToolbarRootContext('ToolbarToggleGroup');

const cls = useToolbarUi('toggleGroup');

const forwardedProps = useOmitProps(props, ['class', 'dir', 'loop', 'rovingFocus']);
const listeners = useForwardListeners(emit);

const mergedClass = computed(() => [cls.value, props.class]);
</script>

<template>
  <ToggleGroupRoot
    v-bind="forwardedProps"
    :class="mergedClass"
    :dir="props.dir ?? dir"
    :orientation="props.orientation ?? orientation"
    :roving-focus="false"
    v-on="listeners"
  >
    <slot />
  </ToggleGroupRoot>
</template>
