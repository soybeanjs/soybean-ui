<script setup lang="ts">
import { toTypeAnchorId, typeToVNode } from './type-anchor';
import { useApiI18n } from './use-api-i18n';

interface Props {
  name: string;
  displayName?: string;
  description?: string;
  descriptionKey?: string | null;
  type: string;
}

const props = defineProps<Props>();
const { resolveApiText } = useApiI18n();

const anchorId = toTypeAnchorId(props.name);
const resolvedDescription = computed(() => resolveApiText(props.description, props.descriptionKey));
</script>

<template>
  <div>
    <h4 :id="anchorId" class="text-lg font-semibold my-3 scroll-mt-24">
      <component :is="typeToVNode(displayName || name)" />
    </h4>
    <p v-if="resolvedDescription" class="text-sm text-muted-foreground">
      {{ resolvedDescription }}
    </p>
    <div class="pt-3 pb-5">
      <div class="code-btn-outline">
        <component :is="typeToVNode(type)" />
      </div>
    </div>
  </div>
</template>
