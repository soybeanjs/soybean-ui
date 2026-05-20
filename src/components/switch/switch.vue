<script setup lang="ts" generic="T extends AcceptableBooleanValue = boolean">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { SwitchCompact, provideSwitchUi } from '@soybeanjs/headless/switch';
import type { AcceptableBooleanValue } from '@soybeanjs/headless/types';
import { keysOf } from '@soybeanjs/utils';
import { switchVariants } from '@/styles/switch';
import type { SwitchProps, SwitchEmits, SwitchSlots } from './types';

defineOptions({
  name: 'SSwitch'
});

const props = withDefaults(defineProps<SwitchProps<T>>(), {
  modelValue: undefined,
  trueValue: true as any,
  falseValue: false as any
});

const emit = defineEmits<SwitchEmits<T>>();

const slots = defineSlots<SwitchSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'color', 'size', 'shape']);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() =>
  switchVariants(
    {
      color: props.color,
      size: props.size,
      shape: props.shape
    },
    props.ui,
    { root: props.class }
  )
);

provideSwitchUi(ui);
</script>

<template>
  <SwitchCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </SwitchCompact>
</template>
