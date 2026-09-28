<script setup lang="ts">
import { computed, onUnmounted, shallowRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBodyScrollLock, useEscapeKeyDown } from '@soybeanjs/headless/composables';
import { isClient, pascalCase } from '@soybeanjs/headless/shared';
import type { SegmentOptionData, TabsOptionData } from '@soybeanjs/ui';
import { getOrderedPlaygroundExamples } from '~/constants/globs';
import { defaultPlaygroundDevice, playgroundDeviceMetas, playgroundDevices } from '~/constants/playground';
import type { PlaygroundDevice } from '~/constants/playground';
import CodeBlock from './code-block.vue';
import PlaygroundViewport from './playground-viewport.vue';

interface Props {
  component: string;
}

const props = defineProps<Props>();

const { te, t } = useI18n();

function resolveExampleTitle(file: string) {
  const key = `playground.examples.${props.component}.${file}`;

  return te(key) ? t(key) : pascalCase(file);
}

const components = computed(() =>
  getOrderedPlaygroundExamples(props.component).map(item => ({
    title: resolveExampleTitle(item.name),
    file: item.name,
    rawFileName: item.rawFileName,
    code: item.code,
    component: item.component
  }))
);

const playgroundTabValues = ['preview', 'code'] as const;

type TabValue = (typeof playgroundTabValues)[number];

const tabs = computed<TabsOptionData<TabValue>[]>(() => [
  { value: 'preview', label: t('playground.preview') },
  { value: 'code', label: t('playground.code') }
]);

/**
 * Screen-resolution switcher of one example card.
 *
 * `desktop` is the fluid default; `mobile` / `ipad` pin the preview to a device
 * width; `fullscreen` lifts the preview into a viewport-filling layer. The
 * switcher target is the example itself, so every card keeps its own device, and
 * the frame publishes the simulated viewport to the components it renders.
 */
interface PlaygroundDeviceOption extends SegmentOptionData<PlaygroundDevice> {
  icon: string;
  hint: string;
}

const deviceOptions = computed<PlaygroundDeviceOption[]>(() =>
  playgroundDevices.map(device => ({
    value: device,
    label: t(`playground.device.${device}`),
    ...playgroundDeviceMetas[device]
  }))
);

// Per-example state. `fullscreen` is tracked apart from the picked device so
// entering it leaves the card's previous device untouched and exiting restores it,
// and it stays exclusive: the layer covering the viewport owns the only switcher.
const deviceState = shallowRef<Partial<Record<string, PlaygroundDevice>>>({});
const tabState = shallowRef<Partial<Record<string, TabValue>>>({});
const fullscreenFile = shallowRef<string | null>(null);
const unlockScroll = shallowRef<(() => void) | null>(null);

const fullscreenLayerVisible = computed(
  () => fullscreenFile.value !== null && resolveTab(fullscreenFile.value) === 'preview'
);

function isOneOf<T extends string>(options: readonly T[], value: unknown): value is T {
  return options.some(option => option === value);
}

function resolveDevice(file: string): PlaygroundDevice {
  return fullscreenFile.value === file ? 'fullscreen' : (deviceState.value[file] ?? defaultPlaygroundDevice);
}

function resolveDeviceHint(file: string): string {
  return playgroundDeviceMetas[resolveDevice(file)].hint;
}

function resolveTab(file: string): TabValue {
  return tabState.value[file] ?? 'preview';
}

function resolveViewportClass(file: string): string {
  return resolveDevice(file) === 'fullscreen'
    ? 'fixed inset-0 z-50 flex flex-col gap-3 bg-background p-4'
    : 'flex flex-col gap-3';
}

function isFullscreenPreview(file: string): boolean {
  return resolveDevice(file) === 'fullscreen';
}

function handleDeviceChange(file: string, value: unknown) {
  if (!isOneOf(playgroundDevices, value)) {
    return;
  }

  if (value === 'fullscreen') {
    fullscreenFile.value = file;
    return;
  }

  fullscreenFile.value = null;
  deviceState.value = { ...deviceState.value, [file]: value };
}

function handleTabChange(file: string, value: unknown) {
  if (!isOneOf(playgroundTabValues, value)) {
    return;
  }

  tabState.value = { ...tabState.value, [file]: value };
}

function exitFullscreen() {
  fullscreenFile.value = null;
}

useEscapeKeyDown(() => (isClient ? document : undefined), exitFullscreen);

// The lock follows the visible layer, not just the picked device: switching a card
// to the code tab hides the layer, so its lock has to be released with it.
watch(fullscreenLayerVisible, visible => {
  if (visible) {
    unlockScroll.value = useBodyScrollLock();
    return;
  }

  unlockScroll.value?.();
  unlockScroll.value = null;
});

onUnmounted(() => {
  unlockScroll.value?.();
  unlockScroll.value = null;
});
</script>

<template>
  <div class="space-y-5">
    <template v-for="(item, index) in components" :key="index">
      <SCard :title="item.title" split class="overflow-hidden">
        <template #default>
          <STabs
            :items="tabs"
            :model-value="resolveTab(item.file)"
            fill="auto"
            @update:model-value="handleTabChange(item.file, $event)"
          >
            <template #content="{ value }">
              <template v-if="item.component">
                <div v-if="value === 'preview'" :class="resolveViewportClass(item.file)">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2 text-xs text-muted-foreground">
                      <span v-if="isFullscreenPreview(item.file)" class="font-medium text-foreground">
                        {{ item.title }}
                      </span>
                      <span class="font-mono">{{ resolveDeviceHint(item.file) }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <SSegment
                        :items="deviceOptions"
                        :model-value="resolveDevice(item.file)"
                        size="sm"
                        shape="rounded"
                        @update:model-value="handleDeviceChange(item.file, $event)"
                      >
                        <template #item="{ icon, label }">
                          <SIcon :icon="icon" />
                          <span>{{ label }}</span>
                        </template>
                      </SSegment>
                      <SButtonIcon
                        v-if="isFullscreenPreview(item.file)"
                        icon="lucide:minimize-2"
                        size="sm"
                        :aria-label="t('playground.device.exit_fullscreen')"
                        @click="exitFullscreen"
                      />
                    </div>
                  </div>
                  <PlaygroundViewport :device="resolveDevice(item.file)">
                    <component :is="item.component" />
                  </PlaygroundViewport>
                </div>
                <CodeBlock v-else :code="item.code" lang="vue" />
              </template>
              <SAlert
                v-else
                color="destructive"
                :title="`${component}/${item.rawFileName} ${t('not_found')}`"
                icon="lucide:alert-circle"
              />
            </template>
          </STabs>
        </template>
      </SCard>
    </template>
  </div>
</template>
