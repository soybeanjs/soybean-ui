<script setup lang="ts">
import { computed, useId } from 'vue';
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import { useThemeSize } from '../../context/theme';
import SSwitchRoot from './switch-root.vue';
import SSwitchThumb from './switch-thumb.vue';
import type { SwitchEmits, SwitchProps } from './types';

defineOptions({
  name: 'SSwitch'
});

const { class: cls, size: _size, ui, id, ...delegatedProps } = defineProps<SwitchProps>();

const emit = defineEmits<SwitchEmits>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

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
