<script setup lang="ts">
import { toTypeAnchorId, typeToVNode } from './type-anchor';

interface Props {
  name: string;
  description?: string;
  type: string;
}

const props = defineProps<Props>();

const anchorId = toTypeAnchorId(props.name);
</script>

<template>
  <div>
    <h4 :id="anchorId" class="text-lg font-semibold my-3 scroll-mt-24">
      {{ name }}
    </h4>
    <p v-if="description" class="text-sm text-muted-foreground">
      {{ description }}
    </p>
    <div class="pt-3 pb-5">
      <div class="code-btn-outline">
        <component :is="typeToVNode(type)" />
      </div>
    </div>
  </div>
</template>
