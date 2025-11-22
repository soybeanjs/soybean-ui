<script setup lang="ts">
import { computed, shallowRef, useAttrs, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import type { CommandOptionData } from '@soybeanjs/ui';

defineOptions({
  name: 'SearchDocument',
  inheritAttrs: false
});

const attrs = useAttrs();
const { t } = useI18n();
const keys = useMagicKeys();

const search = shallowRef('');

const searched = shallowRef<CommandOptionData[]>([]);

const searchOpen = shallowRef(false);

const CmdK = computed(() => keys['Cmd+K']?.value);

function handleOpenChange() {
  searchOpen.value = !searchOpen.value;
}

watch(CmdK, v => {
  if (v) {
    handleOpenChange();
  }
});
</script>

<template>
  <SDialogPure v-model:open="searchOpen">
    <template #trigger>
      <div
        v-bind="attrs"
        class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <SIcon icon="lucide:search" class="text-base" />
        <span class="placeholder">{{ t('layout.header.search') }}</span>
        <SKbd :value="['command', 'k']" class="ml-auto" />
      </div>
    </template>

    <SCommand
      v-model:search-term="search"
      class="border rounded-lg shadow-md"
      :items="searched"
      :input-props="{ placeholder: t('layout.header.search') }"
      :empty-label="t('layout.header.search-empty')"
    />
  </SDialogPure>
</template>
