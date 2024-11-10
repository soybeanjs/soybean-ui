<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';
import SSwitchRoot from './switch-root.vue';
import SSwitchThumb from './switch-thumb.vue';
import type { SwitchEmits, SwitchProps } from './types';

defineOptions({
  name: 'SSwitch'
});

const { id, thumbClass, ...delegatedProps } = defineProps<SwitchProps>();

const emit = defineEmits<SwitchEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const defaultId = useId();

const switchId = computed(() => id || `switch-${defaultId}`);
</script>

<template>
  <SSwitchRoot v-bind="forwarded" :id="switchId">
    <SSwitchThumb :class="thumbClass" :size>
      <slot />
    </SSwitchThumb>
  </SSwitchRoot>
</template>

<style scoped></style>
