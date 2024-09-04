<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxGroupProps } from './types';
import SCheckbox from './checkbox.vue';

defineOptions({
  name: 'SCheckboxGroup'
});

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  as: 'div'
});

type Emits = {
  'update:values': [values: string[]];
};

const emit = defineEmits<Emits>();

const cls = computed(() => {
  const { group } = checkboxVariants({ orientation: props.orientation });

  return cn(group(), props.class);
});

const checks = computed({
  get() {
    return props.values || props.defaultValues || [];
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
  <Primitive :as="as" :as-child="asChild" :class="cls">
    <SCheckbox
      v-for="item in items"
      :key="item.value"
      v-bind="item"
      :checked="checks.includes(item.value)"
      :color="color"
      :disabled="disabled || item.disabled"
      @update:checked="handleUpdateCheckItem(item.value, $event as boolean)"
    />
    <!-- BUG: Vue 3.5 @update:checked type error -->
  </Primitive>
</template>

<style scoped></style>
