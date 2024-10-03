<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import SCheckbox from './checkbox.vue';
import type { CheckboxGroupEmits, CheckboxGroupProps } from './types';

defineOptions({
  name: 'SCheckboxGroup'
});

const { class: cls, orientation, values, defaultValues } = defineProps<CheckboxGroupProps>();

const emit = defineEmits<CheckboxGroupEmits>();

const mergedCls = computed(() => {
  const { group } = checkboxVariants({ orientation });

  return cn(group(), cls);
});

const checks = computed({
  get() {
    return values || defaultValues || [];
  },
  set(value: string[]) {
    emit('update:values', value);
  }
});

function handleUpdateCheckItem(value: string, checked: boolean) {
  if (checked) {
    checks.value = [...checks.value, value];
  } else {
    checks.value = checks.value.filter(v => v !== value);
  }
}
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <SCheckbox
      v-for="item in items"
      :key="item.value"
      v-bind="item"
      :checked="checks.includes(item.value)"
      :color
      :size
      :disabled="disabled || item.disabled"
      @update:checked="handleUpdateCheckItem(item.value, $event)"
    />
  </Primitive>
</template>

<style scoped></style>
