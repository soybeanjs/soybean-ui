<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import Icon from '../_icon/icon.vue';
import { useInputRootContext, useInputUi } from './context';
import type { InputClearProps, InputClearEmits } from './types';

defineOptions({
  name: 'InputClear'
});

const props = defineProps<InputClearProps>();

const emit = defineEmits<InputClearEmits>();

const cls = useInputUi('clear');

const { disabled: rootDisabled, readonly, onClear } = useInputRootContext('InputClear');

const disabled = computed(() => props.disabled || rootDisabled.value || readonly.value || false);

const handleClear = (event: PointerEvent) => {
  emit('clear', event);

  onClear?.();
};
</script>

<template>
  <Button v-bind="props" data-soybean-input-clearable :class="cls" :disabled="disabled" @click="handleClear">
    <slot>
      <Icon icon="lucide:x" />
    </slot>
  </Button>
</template>
