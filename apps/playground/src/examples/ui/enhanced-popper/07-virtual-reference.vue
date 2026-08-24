<script setup lang="ts">
import { computed, nextTick, shallowRef } from 'vue';
import { epVariants } from './ui/styles';
import { EpAnchor, EpArrow, EpPopup, EpPortal, EpPositioner, EpRoot, provideEpUi } from './headless';
import type { EpOpenChangeReason, EpReferenceElement } from './headless';

type PointPreset = 'top-start' | 'center' | 'bottom-end';

interface PointOption {
  label: string;
  value: PointPreset;
}

const options: PointOption[] = [
  { label: 'Viewport top-start', value: 'top-start' },
  { label: 'Viewport center', value: 'center' },
  { label: 'Viewport bottom-end', value: 'bottom-end' }
];

const point = shallowRef({ x: 80, y: 80 });
const open = shallowRef(false);

const reference = computed<EpReferenceElement>(() => ({
  getBoundingClientRect: () =>
    DOMRect.fromRect({
      x: point.value.x,
      y: point.value.y,
      width: 0,
      height: 0
    })
}));

const ui = computed(() => epVariants({ size: 'md' }));

function resolvePoint(preset: PointPreset) {
  const margin = 80;

  if (preset === 'top-start') {
    return { x: margin, y: margin };
  }

  if (preset === 'bottom-end') {
    return { x: window.innerWidth - margin, y: window.innerHeight - margin };
  }

  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

async function openAt(preset: PointPreset) {
  point.value = resolvePoint(preset);
  open.value = false;
  await nextTick();
  open.value = true;
}

function onOpenChange(value: boolean, _reason: EpOpenChangeReason) {
  open.value = value;
}

provideEpUi(ui);
</script>

<template>
  <EpRoot :open="open" @update:open="onOpenChange">
    <EpAnchor :reference="reference" />

    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:bg-accent"
        @click="openAt(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <EpPortal>
      <EpPositioner :side-offset="6" :collision-padding="16">
        <EpPopup role="dialog">
          <p class="font-medium">Virtual reference</p>
          <p class="mt-1 text-muted-foreground">Current point: {{ Math.round(point.x) }}, {{ Math.round(point.y) }}</p>
          <EpArrow />
        </EpPopup>
      </EpPositioner>
    </EpPortal>
  </EpRoot>
</template>
