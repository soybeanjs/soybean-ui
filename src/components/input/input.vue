<script setup lang="ts">
import { computed } from 'vue';
import { InputCompact, provideInputUi } from '@soybeanjs/headless/input';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { inputVariants } from '@/styles/input';
import type { InputProps, InputEmits, InputSlots } from './types';

defineOptions({
  name: 'SInput'
});

const props = defineProps<InputProps>();

const emit = defineEmits<InputEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const slots = defineSlots<InputSlots>();

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => inputVariants({ size: props.size }, props.ui, { root: props.class }));

provideInputUi(ui);
</script>

<template>
  <InputCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </InputCompact>
</template>
