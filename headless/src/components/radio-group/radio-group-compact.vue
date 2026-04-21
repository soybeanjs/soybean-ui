<script
  setup
  lang="ts"
  generic="
    T extends AcceptableBooleanValue = AcceptableBooleanValue,
    S extends RadioGroupOptionData<T> = RadioGroupOptionData<T>
  "
>
import { useId } from 'vue';
import { useOmitProps } from '../../composables';
import type { AcceptableBooleanValue } from '../../types';
import RadioGroupControl from './radio-group-control.vue';
import RadioGroupIndicator from './radio-group-indicator.vue';
import RadioGroupItem from './radio-group-item.vue';
import RadioGroupLabel from './radio-group-label.vue';
import RadioGroupRoot from './radio-group-root.vue';
import type { RadioGroupCompactEmits, RadioGroupCompactProps, RadioGroupOptionData } from './types';

defineOptions({
  name: 'RadioGroupCompact'
});

const props = defineProps<RadioGroupCompactProps<T, S>>();

const emit = defineEmits<RadioGroupCompactEmits<T>>();

const forwardedProps = useOmitProps(props, ['items', 'itemProps', 'controlProps', 'indicatorProps', 'labelProps']);

const defaultId = useId();

const getItemKey = (item: S) => String(item.value);

const getItemId = (index: number) => `${props.itemProps?.id || `radio-${defaultId}`}-${index}`;

const handleModelValueChange = (value: AcceptableBooleanValue) => {
  emit('update:modelValue', value as NonNullable<T>);
};
</script>

<template>
  <RadioGroupRoot v-bind="forwardedProps" @update:model-value="handleModelValueChange">
    <RadioGroupItem
      v-for="(item, index) in items"
      :key="getItemKey(item)"
      v-bind="itemProps"
      :value="item.value"
      :disabled="disabled || item.disabled"
    >
      <RadioGroupControl v-bind="controlProps" :id="getItemId(index)">
        <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
          <RadioGroupIndicator v-bind="indicatorProps" />
        </Transition>
      </RadioGroupControl>
      <RadioGroupLabel v-bind="labelProps">
        {{ item.label }}
      </RadioGroupLabel>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
