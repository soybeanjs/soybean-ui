<script setup lang="ts">
import { computed } from 'vue';
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { PinInputEmits, PinInputProps } from '../types';
import PinInputRoot from './pin-input-root.vue';
import PinInputInputRoot from './pin-input-input-root.vue';
import PinInputInput from './pin-input-input.vue';
import PinInputSeparator from './pin-input-separator.vue';

defineOptions({
  name: 'SPinInput'
});

const { class: cls, size, ui, inputCount = 5, separate, ...delegatedRootProps } = defineProps<PinInputProps>();

const emit = defineEmits<PinInputEmits>();

type Slots = {
  default: () => any;
  separator?: (params: { index: number }) => any;
};

const slots = defineSlots<Slots>();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);

const hasSeparator = computed(() => separate || Boolean(slots.separator));
</script>

<template>
  <PinInputRoot v-bind="forwarded" :class="cls || ui?.root">
    <slot>
      <PinInputInputRoot :class="ui?.inputRoot" :size="size" :separate="hasSeparator">
        <template v-for="(_item, index) in inputCount" :key="index">
          <PinInputInput :class="ui?.input" :size="size" :separate="hasSeparator" :index="index" />
          <template v-if="index < inputCount - 1">
            <PinInputSeparator v-if="hasSeparator" :class="ui?.separator" :size="size">
              <slot name="separator" :index="index" />
            </PinInputSeparator>
          </template>
        </template>
      </PinInputInputRoot>
    </slot>
  </PinInputRoot>
</template>
