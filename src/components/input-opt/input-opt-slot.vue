<script setup lang="ts">
import { computed } from 'vue';
import { useInputOptRootContext } from '@soybeanjs/headless';
import { cn } from '@/theme';
import {
  inputOptCaretClass,
  inputOptCaretLineClass,
  inputOptPlaceholderClass,
  inputOptSlotClass
} from './variants';
import type { InputOptSlotProps } from './types';

defineOptions({
  name: 'SInputOptSlot'
});

const props = defineProps<InputOptSlotProps>();

const { slots } = useInputOptRootContext('InputOptSlot');

const slotState = computed(() => slots.value[props.index]);
</script>

<template>
  <div
    :class="cn(inputOptSlotClass, props.class)"
    data-slot="input-opt-slot"
    :data-active="slotState?.isActive || undefined"
    aria-hidden="true"
  >
    <span v-if="slotState?.char !== null">{{ slotState?.char }}</span>
    <span v-else-if="slotState?.placeholderChar" :class="inputOptPlaceholderClass">{{ slotState?.placeholderChar }}</span>
    <div v-if="slotState?.hasFakeCaret" :class="inputOptCaretClass">
      <div :class="inputOptCaretLineClass" />
    </div>
  </div>
</template>
