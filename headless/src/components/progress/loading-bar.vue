<script setup lang="ts">
import { computed, onWatcherCleanup, shallowRef, watchEffect } from 'vue';
import { Primitive } from '../primitive';
import { useDirection } from '../config-provider/context';
import { useProgressUi } from './context';
import { DEFAULT_MAX, getProgressIndicatorStyle, getValueLabel } from './shared';
import { loadingBarState } from './state';
import type { ProgressState } from './types';

defineOptions({
  name: 'LoadingBar'
});

const dir = useDirection();
const ui = useProgressUi();

const snapshot = shallowRef(loadingBarState.getSnapshot());

const progressState = computed<ProgressState>(() => (snapshot.value.modelValue >= DEFAULT_MAX ? 'complete' : 'loading'));

const ariaValueText = computed(() => getValueLabel(snapshot.value.modelValue, DEFAULT_MAX));

const indicatorStyle = computed(() => getProgressIndicatorStyle(snapshot.value.modelValue, dir.value));

watchEffect(() => {
  const unsubscribe = loadingBarState.subscribe(nextSnapshot => {
    snapshot.value = nextSnapshot;
  });

  onWatcherCleanup(() => {
    unsubscribe();
  });
});
</script>

<template>
  <Primitive
    v-if="snapshot.visible"
    as="div"
    :class="ui.root"
    role="progressbar"
    aria-label="Loading"
    :aria-valuemin="0"
    :aria-valuemax="DEFAULT_MAX"
    :aria-valuenow="snapshot.modelValue"
    :aria-valuetext="ariaValueText"
    :data-state="progressState"
    :data-status="snapshot.status"
    :data-value="snapshot.modelValue"
    :data-max="DEFAULT_MAX"
    data-slot="root"
  >
    <Primitive
      as="div"
      :class="ui.indicator"
      :style="indicatorStyle"
      :data-state="progressState"
      :data-status="snapshot.status"
      :data-value="snapshot.modelValue"
      :data-max="DEFAULT_MAX"
      data-slot="indicator"
    />
  </Primitive>
  <slot />
</template>
