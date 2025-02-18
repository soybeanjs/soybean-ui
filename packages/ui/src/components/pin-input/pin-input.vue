<script setup lang="ts">
import { computed } from 'vue';
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import PinInputRoot from './pin-input-root.vue';
import PinInputInputRoot from './pin-input-input-root.vue';
import PinInputInput from './pin-input-input.vue';
import PinInputSeparator from './pin-input-separator.vue';
import type { PinInputEmits, PinInputProps } from './types';

defineOptions({
  name: 'SPinInput'
});

const {
  size,
  inputCount = 5,
  separate,
  inputRootClass,
  itemClass,
  separatorClass,
  ...delegatedRootProps
} = defineProps<PinInputProps>();

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
  <PinInputRoot v-bind="forwarded">
    <slot>
      <PinInputInputRoot :separate="hasSeparator" :class="inputRootClass">
        <template v-for="(_item, index) in inputCount" :key="index">
          <PinInputInput :class="itemClass" :size="size" :separate="hasSeparator" :index="index" />
          <template v-if="index < inputCount - 1">
            <PinInputSeparator v-if="hasSeparator" :class="separatorClass">
              <slot name="separator" :index="index" />
            </PinInputSeparator>
          </template>
        </template>
      </PinInputInputRoot>
    </slot>
  </PinInputRoot>
</template>
