<script setup lang="ts">
import { SLink } from '@soybeanjs/ui';
import type { GeneratedApiTypePreview } from './generated-api';
import CallableTypeTable from './callable-type-table.vue';
import TypeData from './type-data.vue';
import UnionType from './union-type.vue';
import { useApiI18n } from './use-api-i18n';

interface Props {
  href?: string | null;
  preview: GeneratedApiTypePreview;
}

defineProps<Props>();

const { resolveApiText, t } = useApiI18n();
</script>

<template>
  <div class="min-w-80 w-fit max-w-[calc(100vw-2rem)] max-h-96 overflow-auto p-1 space-y-3">
    <p
      v-if="resolveApiText(preview.description, preview.descriptionKey)"
      class="text-xs leading-5 text-muted-foreground"
    >
      {{ resolveApiText(preview.description, preview.descriptionKey) }}
    </p>

    <TypeData
      v-if="preview.kind === 'table'"
      :name="preview.name"
      :display-name="preview.displayName"
      :description="preview.description"
      :description-key="preview.descriptionKey"
      :fields="preview.fields"
      hide-header
    />

    <CallableTypeTable
      v-else-if="preview.kind === 'callable'"
      :name="preview.name"
      :display-name="preview.displayName"
      :description="preview.description"
      :description-key="preview.descriptionKey"
      :preset="preview.preset"
      :rows="preview.rows"
      hide-header
    />

    <UnionType
      v-else
      :name="preview.name"
      :display-name="preview.displayName"
      :description="preview.description"
      :description-key="preview.descriptionKey"
      :type="preview.code || `type ${preview.displayName || preview.name} = ${preview.type}`"
    />

    <div v-if="href" class="border-t pt-2">
      <SLink :href="href" target="_self" class="text-xs text-primary hover:underline underline-offset-4">
        {{ t('api.actions.open_full_type') }}
      </SLink>
    </div>
  </div>
</template>
