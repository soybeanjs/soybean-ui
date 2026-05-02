<script setup lang="ts">
import type { TabsOptionData } from '@soybeanjs/ui';
import { getPlaygroundComponent, getPlaygroundComponentCode } from '../constants/globs';

interface Props {
  component: string;
  files: string[];
}

const props = defineProps<Props>();

const { t } = useI18n();

const components = computed(() =>
  props.files.map(file => ({
    file,
    component: getPlaygroundComponent(props.component, file),
    code: getPlaygroundComponentCode(props.component, file)
  }))
);

type TabValue = 'preview' | 'code';

const tabs = computed<TabsOptionData<TabValue>[]>(() => [
  { value: 'preview', label: t('playground.preview') },
  { value: 'code', label: t('playground.code') }
]);
</script>

<template>
  <div class="space-y-5">
    <template v-for="(item, index) in components" :key="index">
      <SCard
        size="sm"
        split
        class="overflow-hidden border-border/60 bg-background/78 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
      >
        <template #title>{{ item.file }}</template>
        <template #description>{{ component }}</template>
        <template #extra>
          <SBadge size="xs" color="primary">{{ t('components.common.demo') }}</SBadge>
        </template>

        <template #default>
          <STabs :items="tabs" :default-value="'preview' as TabValue" fill="auto">
            <template #content="{ value }">
              <template v-if="item.component">
                <div
                  v-if="value === 'preview'"
                  class="min-h-36 rounded-4 border border-dashed border-border/70 bg-linear-to-br from-background via-background to-muted/18 p-4 sm:p-5"
                >
                  <component :is="item.component" />
                </div>
                <CodeBlock v-else :code="item.code" lang="vue" />
              </template>
              <SAlert
                v-else
                color="destructive"
                :title="`${component}/${item.file} ${t('not_found')}`"
                icon="lucide:alert-circle"
              />
            </template>
          </STabs>
        </template>
      </SCard>
    </template>
  </div>
</template>
