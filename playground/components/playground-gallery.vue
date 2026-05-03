<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { pascalCase } from '@soybeanjs/utils';
import { allPlaygroundComponents } from '../../docs/src/constants/globs';

interface Props {
  component: string;
}

const props = defineProps<Props>();

const { t, te } = useI18n();

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
</script>

<template>
  <div class="space-y-5">
    <template v-for="(item, index) in components" :key="index">
      <SCard :title="item.title" split class="glass-shell overflow-hidden">
        <component :is="item.component" v-if="item.component" />
        <SAlert
          v-else
          color="destructive"
          :title="`${component}/${item.file} ${t('not_found')}`"
          icon="lucide:alert-circle"
        />
      </SCard>
    </template>
  </div>
</template>
