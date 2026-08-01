<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../_icon/icon.vue';
import { useCascaderRootContext, useCascaderUi } from './context';
import type { CascaderClearProps } from './types';

defineOptions({
  name: 'CascaderClear'
});

withDefaults(defineProps<CascaderClearProps>(), {
  ariaLabel: ''
});

const { modelValue, clearValue } = useCascaderRootContext('CascaderClear');

const cls = useCascaderUi('clear');

const hasValue = computed(() => {
  const value = modelValue.value;
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null;
});
</script>

<template>
  <button
    v-if="hasValue"
    type="button"
    data-soybean-cascader-clear
    :class="cls"
    :aria-label="ariaLabel || '清除'"
    tabindex="-1"
    @click.prevent.stop="clearValue"
    @pointerdown.prevent.stop
  >
    <slot>
      <Icon icon="lucide:x" />
    </slot>
  </button>
</template>
