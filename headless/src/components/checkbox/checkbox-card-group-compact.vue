<script
  setup
  lang="ts"
  generic="
    T extends DefinedValue = DefinedValue,
    S extends CheckboxCardGroupOptionData<T> = CheckboxCardGroupOptionData<T>
  "
>
import { useId } from 'vue';
import { useOmitProps } from '../../composables';
import type { DefinedValue } from '../../types';
import IconRender from '../icon/icon-render.vue';
import CheckboxControl from './checkbox-control.vue';
import CheckboxGroupRoot from './checkbox-group-root.vue';
import CheckboxIndicator from './checkbox-indicator.vue';
import CheckboxLabel from './checkbox-label.vue';
import CheckboxRoot from './checkbox-root.vue';
import type {
  CheckboxCardGroupCompactEmits,
  CheckboxCardGroupCompactProps,
  CheckboxCardGroupOptionData
} from './types';

defineOptions({
  name: 'CheckboxCardGroupCompact'
});

const props = defineProps<CheckboxCardGroupCompactProps<T, S>>();

const emit = defineEmits<CheckboxCardGroupCompactEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'items',
  'rootProps',
  'controlProps',
  'indicatorProps',
  'labelProps',
  'contentClass',
  'textContentClass',
  'iconClass',
  'descriptionClass'
]);

const defaultId = useId();

const getItemKey = (item: S, index: number) => `${String(item.value)}-${index}`;

const getItemId = (index: number) => `${props.rootProps?.id || `checkbox-${defaultId}`}-${index}`;

const handleModelValueChange = (value: DefinedValue[]) => {
  emit('update:modelValue', value as T[]);
};
</script>

<template>
  <CheckboxGroupRoot v-bind="forwardedProps" @update:model-value="handleModelValueChange">
    <CheckboxRoot
      v-for="(item, index) in items"
      :key="getItemKey(item, index)"
      v-slot="slotProps"
      v-bind="rootProps"
      :value="item.value"
      :disabled="disabled || item.disabled"
    >
      <div :class="contentClass">
        <IconRender v-if="item.icon" :icon="item.icon" :class="iconClass" />
        <div :class="textContentClass">
          <CheckboxLabel v-bind="labelProps" :for="getItemId(index)">
            {{ item.label }}
          </CheckboxLabel>
          <p v-if="item.description" :class="descriptionClass">
            {{ item.description }}
          </p>
        </div>
      </div>
      <CheckboxControl v-bind="controlProps" :id="getItemId(index)">
        <Transition enter-active-class="transition-50" enter-from-class="opacity-0 scale-0">
          <CheckboxIndicator v-bind="indicatorProps">
            <IconRender :icon="slotProps.state === 'indeterminate' ? 'lucide:minus' : 'lucide:check'" />
          </CheckboxIndicator>
        </Transition>
      </CheckboxControl>
    </CheckboxRoot>
  </CheckboxGroupRoot>
</template>
