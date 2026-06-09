<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { pascalCase } from '@soybeanjs/utils';
import { getOrderedPlaygroundExamples } from '@docs/constants/globs';

interface Props {
  component: string;
}

const props = defineProps<Props>();

const { t, te } = useI18n();

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
</script>

<template>
  <div class="space-y-5">
    <template v-for="(item, index) in components" :key="index">
      <SCard :title="item.title" split class="overflow-hidden">
        <component :is="item.component" v-if="item.component" />
        <SAlert
          v-else
          color="destructive"
          :title="`${component}/${item.rawFileName}未找到`"
          icon="lucide:alert-circle"
        />
      </SCard>
    </template>
  </div>
</template>
