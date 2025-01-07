<script setup lang="ts">
import { ref } from 'vue';
import { STabs } from 'soy-ui';
import type { TabsOption } from 'soy-ui';
import { PACKAGE_MANAGERS } from '../../plugins/installation-tabs';
import { store } from '../../store';

defineOptions({
  name: 'InstallationTabs'
});

const packageManagers = ref<TabsOption[]>(PACKAGE_MANAGERS.map(pkg => ({ value: pkg, label: pkg })));
</script>

<template>
  <STabs v-model="store.packageManager" :items="packageManagers" class="w-fit">
    <template #content="{ value }">
      <slot :value="value" />
    </template>
  </STabs>
</template>
