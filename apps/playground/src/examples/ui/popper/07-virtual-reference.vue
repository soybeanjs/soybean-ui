<script setup lang="ts">
import { computed, nextTick, shallowRef } from 'vue';
import {
  PopperV2Anchor,
  PopperV2Arrow,
  PopperV2Popup,
  PopperV2Portal,
  PopperV2Positioner,
  PopperV2Root,
  providePopperV2Ui
} from '@soybeanjs/headless/popper-v2';

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

const reference = computed(() => ({
  getBoundingClientRect: () =>
    DOMRect.fromRect({
      x: point.value.x,
      y: point.value.y,
      width: 0,
      height: 0
    })
}));

const ui = computed(() => ({
  positioner: 'w-max max-w-[min(24rem,calc(100vw-2rem))]',
  popup: [
    'relative z-50 min-w-48 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none will-change-transform',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
  ],
  arrow: 'h-2 w-4 fill-popover stroke-border'
}));

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

function onOpenChange(value: boolean, _reason: string) {
  open.value = value;
}

providePopperV2Ui(ui);
</script>

<template>
  <PopperV2Root :open="open" @update:open="onOpenChange">
    <PopperV2Anchor :reference="reference" />

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

    <PopperV2Portal>
      <PopperV2Positioner :side-offset="6" :collision-padding="16">
        <PopperV2Popup role="dialog">
          <p class="font-medium">Virtual reference</p>
          <p class="mt-1 text-muted-foreground">Current point: {{ Math.round(point.x) }}, {{ Math.round(point.y) }}</p>
          <PopperV2Arrow />
        </PopperV2Popup>
      </PopperV2Positioner>
    </PopperV2Portal>
  </PopperV2Root>
</template>
