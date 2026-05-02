<script setup lang="ts">
import type { TabsOptionData } from '@soybeanjs/ui';
import { getPlaygroundComponent, getPlaygroundComponentCode } from '../constants/globs';

interface Props {
  component: string;
  files: string[];
}

const props = defineProps<Props>();

const { t } = useI18n();

const componentTitlePrefix = computed(() => `${props.component.toLowerCase()}-`);

const components = computed(() =>
  props.files.map(file => ({
    file,
    title: file.replace(componentTitlePrefix.value, ''),
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
      <SCard :title="item.title" split class="glass-shell overflow-hidden">
        <template #default>
          <STabs :items="tabs" :default-value="'preview' as TabValue" fill="auto">
            <template #content="{ value }">
              <template v-if="item.component">
                <div v-if="value === 'preview'" class="docs-preview-surface min-h-36 border border-dashed p-4 sm:p-5">
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
