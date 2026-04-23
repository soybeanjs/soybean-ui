<script setup lang="ts" generic="T extends CheckboxCardGroupOptionData = CheckboxCardGroupOptionData">
import { computed } from 'vue';
import { CheckboxCardGroupCompact, provideCheckboxCardUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { checkboxCardVariants } from './variants';
import type { CheckboxCardGroupEmits, CheckboxCardGroupOptionData, CheckboxCardGroupProps } from './types';

defineOptions({
  name: 'SCheckboxCardGroup'
});

const props = defineProps<CheckboxCardGroupProps<T>>();

const emit = defineEmits<CheckboxCardGroupEmits<T['value']>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'color', 'size', 'shape']);

const ui = computed(() => {
  const variants = checkboxCardVariants({
    color: props.color,
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui, { groupRoot: props.class });
});

provideCheckboxCardUi(ui);
</script>

<template>
  <CheckboxCardGroupCompact
    v-bind="forwardedProps"
    :content-class="ui.content"
    :text-content-class="ui.textContent"
    :icon-class="ui.icon"
    :description-class="ui.description"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
