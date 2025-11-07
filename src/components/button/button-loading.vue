<script setup lang="ts">
import { computed, ref, useAttrs, watchEffect } from 'vue';
import type { Align } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import Icon from '../icon/icon.vue';
import Button from './button.vue';
import type { ButtonLoadingProps } from './types';

defineOptions({
  name: 'SButtonLoading',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ButtonLoadingProps>(), {
  loadingIcon: 'svg-spinners:270-ring',
  loadingPosition: 'start' as Align
});

const attrs = useAttrs();

const internalLoading = ref(false);

const disabled = computed(() => props.disabled || internalLoading.value);

const onClick = async (event: MouseEvent) => {
  if (props.autoLoading) {
    internalLoading.value = true;
  }

  try {
    const clickHandlers = Array.isArray(attrs.onClick) ? attrs.onClick : [attrs.onClick];
    clickHandlers.forEach(handler => handler?.(event));
  } finally {
    if (props.autoLoading) {
      if (props.loadingDuration) {
        await new Promise(resolve => {
          setTimeout(resolve, props.loadingDuration);
        });
      }
      internalLoading.value = false;
    }
  }
};

const forwardedProps = useOmitProps(
  props,
  ['loading', 'loadingText', 'loadingDuration', 'autoLoading', 'loadingIcon', 'loadingIconProps', 'loadingPosition'],
  attrs,
  { onClick }
);

watchEffect(() => {
  internalLoading.value = props.loading;
});
</script>

<template>
  <Button v-bind="forwardedProps" :disabled="disabled" style="position: relative" @click="onClick">
    <template #leading>
      <Icon v-if="internalLoading && loadingPosition === 'start'" :icon="loadingIcon" v-bind="loadingIconProps" />
      <slot v-else name="leading" />
    </template>
    <span v-if="internalLoading && loadingPosition === 'center'" style="display: contents">
      <span
        style="
          position: absolute;
          inset: 0;
          justify-content: center;
          align-items: center;
          display: flex;
          gap: 0.25rem;
          z-index: 1;
        "
      >
        <Icon :icon="loadingIcon" v-bind="loadingIconProps" />
        <span v-if="loadingText">{{ loadingText }}</span>
      </span>
      <span style="visibility: hidden; display: contents">
        <slot :loading="internalLoading" />
      </span>
    </span>
    <slot v-else :loading="internalLoading" />
    <template #trailing>
      <Icon v-if="internalLoading && loadingPosition === 'end'" :icon="loadingIcon" v-bind="loadingIconProps" />
      <slot v-else name="trailing" />
    </template>
  </Button>
</template>
