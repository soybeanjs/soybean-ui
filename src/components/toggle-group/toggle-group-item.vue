<script setup lang="ts" generic="T extends DefinedValue = string">
import type { DefinedValue } from '@soybeanjs/headless';
import { ToggleGroupItem } from '@soybeanjs/headless';
import type { ToggleGroupItemProps } from '@soybeanjs/headless/toggle-group';
import { useOmitProps } from '@soybeanjs/headless/composables';

defineOptions({
  name: 'SToggleGroupItem'
});

const props = defineProps<ToggleGroupItemProps<T>>();

const forwardedProps = useOmitProps(props, ['class']);
</script>

<template>
  <ToggleGroupItem v-bind="forwardedProps" :class="props.class">
    <slot />
  </ToggleGroupItem>
</template>
