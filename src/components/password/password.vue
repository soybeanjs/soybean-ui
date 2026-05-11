<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { PasswordCompact, providePasswordUi } from '@soybeanjs/headless/password';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants, miniSizeMap } from '@/theme';
import { buttonIconVariants } from '../button/variants';
import { inputVariants } from '../input/variants';
import type { PasswordProps, PasswordEmits, PasswordSlots } from './types';

defineOptions({
  name: 'SPassword'
});

const props = withDefaults(defineProps<PasswordProps>(), {
  visible: undefined
});

const emit = defineEmits<PasswordEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const slots = defineSlots<PasswordSlots>();

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const miniSize = miniSizeMap[props.size ?? 'md'];

  const variants = Object.assign(
    inputVariants({
      size: props.size
    }),
    {
      $base: {
        clear: buttonIconVariants({
          size: miniSize,
          shape: 'circle'
        }),
        visible: buttonIconVariants({
          size: miniSize
        })
      }
    }
  );

  return mergeVariants(variants, props.ui, { root: props.class });
});

providePasswordUi(ui);
</script>

<template>
  <PasswordCompact
    v-bind="forwardedProps"
    @update:model-value="emit('update:modelValue', $event)"
    @update:visible="emit('update:visible', $event)"
  >
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </PasswordCompact>
</template>
