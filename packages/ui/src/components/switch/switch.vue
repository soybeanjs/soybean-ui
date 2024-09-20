<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';
import type { SwitchRootEmits } from 'radix-vue';
import { computedOmit } from '../../shared';
import SSwitchRoot from './switch-root.vue';
import SSwitchThumb from './switch-thumb.vue';
import type { SwitchProps } from './types';

defineOptions({
  name: 'SSwitch'
});

const props = defineProps<SwitchProps>();

const emit = defineEmits<SwitchRootEmits>();

const delegatedProps = computedOmit(props, ['id', 'thumbClass']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const defaultId = useId();

const switchId = computed(() => props.id || `switch-${defaultId}`);
</script>

<template>
  <SSwitchRoot v-bind="forwarded" :id="switchId">
    <SSwitchThumb :size="size" :class="thumbClass">
      <slot />
    </SSwitchThumb>
  </SSwitchRoot>
</template>

<style scoped></style>
