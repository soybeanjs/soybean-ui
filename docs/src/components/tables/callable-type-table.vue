<script setup lang="ts">
import { toTypeAnchorId, typeToVNode } from './type-anchor';
import type { GeneratedApiCallableType } from './generated-api';
import { useApiI18n } from './use-api-i18n';

interface Props {
  name: string;
  displayName?: string;
  description?: string;
  descriptionKey?: string | null;
  preset: GeneratedApiCallableType['preset'];
  rows: GeneratedApiCallableType['rows'];
  hideHeader?: boolean;
}

const props = defineProps<Props>();
const { resolveApiText } = useApiI18n();

const anchorId = toTypeAnchorId(props.name);
const resolvedDescription = computed(() => resolveApiText(props.description, props.descriptionKey));
</script>

<template>
  <div>
    <h4 v-if="!hideHeader" :id="anchorId" class="text-lg font-semibold my-3 scroll-mt-24">
      <component :is="typeToVNode(displayName || name)" />
    </h4>
    <p v-if="resolvedDescription && !hideHeader" class="text-sm text-muted-foreground">
      {{ resolvedDescription }}
    </p>
    <div class="pt-3 pb-5">
      <DataTable :preset="preset" :data="rows" />
    </div>
  </div>
</template>
