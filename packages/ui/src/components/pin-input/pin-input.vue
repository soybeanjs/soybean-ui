<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';
import PinInputRoot from './pin-input-root.vue';
import PinInputItem from './pin-input-input.vue';
import PinInputSeparator from './pin-input-separator.vue';
import type { PinInputEmits, PinInputProps } from './types';

defineOptions({
  name: 'SPinInput'
});

const {
  size,
  inputCount = 5,
  separate,
  itemClass,
  separatorClass,
  ...delegatedRootProps
} = defineProps<PinInputProps>();

const emit = defineEmits<PinInputEmits>();

const slots = useSlots();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);

const hasSeparator = computed(() => separate || Boolean(slots.separator));
</script>

<template>
  <PinInputRoot v-bind="forwarded" :separate="hasSeparator">
    <slot>
      <template v-for="(_item, index) in inputCount" :key="index">
        <PinInputItem :class="itemClass" :size="size" :separate="hasSeparator" :index="index" />
        <template v-if="index < inputCount - 1">
          <PinInputSeparator v-if="hasSeparator" :class="separatorClass">
            <slot name="separator" :index="index" />
          </PinInputSeparator>
        </template>
      </template>
    </slot>
  </PinInputRoot>
</template>
