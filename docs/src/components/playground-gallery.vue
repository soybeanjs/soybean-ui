<script setup lang="ts">
import { computed } from 'vue';
import { SAlert, STabs } from '@soybeanjs/ui';
import type { TabsOptionData } from '@soybeanjs/ui';
import { useI18n } from 'vue-i18n';
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
  <div class="space-y-4">
    <template v-for="(item, index) in components" :key="index">
      <STabs :items="tabs" :default-value="'preview' as TabValue" fill="auto">
        <template #content="{ value }">
          <template v-if="item.component">
            <component :is="item.component" v-if="value === 'preview'" />
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
  </div>
</template>
