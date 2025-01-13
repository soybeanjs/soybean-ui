<script setup lang="ts">
import { ref } from 'vue';
import { Copy } from 'lucide-vue-next';
import { SButtonIcon, STabs } from 'soy-ui';
import type { TabsOption } from 'soy-ui';

defineOptions({
  name: 'InstallationTabs'
});

interface Props {
  pkg: string;
}

const props = defineProps<Props>();

const activePackageManager = ref<string>('npm');

const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;

const packageManagers = ref<TabsOption[]>(PACKAGE_MANAGERS.map(pkg => ({ value: pkg, label: pkg })));

function handleCopy() {
  const command = `${activePackageManager.value} add ${props.pkg}`;

  navigator.clipboard.writeText(command);
}
</script>

<template>
  <STabs v-model="activePackageManager" :items="packageManagers" class="w-fit">
    <template #content="{ value }">
      <div class="h-10 flex-y-center justify-between gap-2 border rounded-md pl-3 pr-1.5">
        <code class="text-sm">$ {{ value }} add {{ pkg }}</code>
        <SButtonIcon @click="handleCopy">
          <Copy />
        </SButtonIcon>
      </div>
    </template>
  </STabs>
</template>
