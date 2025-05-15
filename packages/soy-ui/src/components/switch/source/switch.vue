<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { SwitchEmits, SwitchProps } from '../types';
import SSwitchRoot from './switch-root.vue';
import SSwitchThumb from './switch-thumb.vue';

defineOptions({
  name: 'SSwitch'
});

const { class: cls, size, ui, id, ...delegatedProps } = defineProps<SwitchProps>();

const emit = defineEmits<SwitchEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const defaultId = useId();

const switchId = computed(() => id || `switch-${defaultId}`);
</script>

<template>
  <SSwitchRoot v-bind="forwarded" :id="switchId" :class="cls || ui?.root" :size="size">
    <SSwitchThumb :class="ui?.thumb" :size="size">
      <slot />
    </SSwitchThumb>
  </SSwitchRoot>
</template>
