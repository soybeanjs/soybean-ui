<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TabsOptionData } from '@soybeanjs/ui';
import { pascalCase } from '@soybeanjs/utils';
import { allPlaygroundComponents } from '../constants/globs';
import CodeBlock from './code-block.vue';

interface Props {
  component: string;
}

const props = defineProps<Props>();

const { te, t } = useI18n();

function resolveExampleTitle(file: string) {
  const key = `playground.examples.${props.component}.${file}`;

  return te(key) ? t(key) : pascalCase(file);
}

const components = computed(() => {
  const map = allPlaygroundComponents[props.component];
  if (!map) return [];

  const files = ['basic', ...Object.keys(map).filter(file => file !== 'basic')];

  return files.map(file => {
    const { code = '', component = null } = map[file] || {};

    return {
      title: resolveExampleTitle(file),
      file,
      code,
      component
    };
  });
});

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
          <STabs :items="tabs" default-value="preview" fill="auto">
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
