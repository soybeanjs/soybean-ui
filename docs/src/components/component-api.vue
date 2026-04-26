<script setup lang="ts">
import { SLink } from '@soybeanjs/ui';
import { getComponentApiSections, getComponentLocalTypes } from './tables/generated-api';

interface Props {
  component: string;
}

const props = defineProps<Props>();

const { t } = useI18n();

const apiLayers = computed(() => getComponentApiSections(props.component));

const localTypes = computed(() => getComponentLocalTypes(props.component));

const layerTitleMap: Record<'ui' | 'headless', string> = {
  ui: 'api.ui_layer',
  headless: 'api.headless_layer'
};
</script>

<template>
  <div class="space-y-8">
    <section v-for="layer in apiLayers" :key="layer.key" class="space-y-6">
      <h3 class="text-xl font-semibold scroll-mt-24">{{ t(layerTitleMap[layer.key]) }}</h3>

      <div v-for="symbol in layer.symbols" :key="symbol.key" class="space-y-4">
        <h4 class="text-lg font-semibold scroll-mt-24">{{ symbol.displayName }}</h4>

        <div v-if="symbol.propsRows.length" class="space-y-3">
          <h5 class="text-base font-medium">{{ t('api.props') }}</h5>
          <DataTable preset="props" :data="symbol.propsRows" />
        </div>

        <div v-if="symbol.emitsRows.length" class="space-y-3">
          <h5 class="text-base font-medium">{{ t('api.emits') }}</h5>
          <DataTable preset="emits" :data="symbol.emitsRows" />
        </div>

        <div v-if="symbol.slotsRows.length" class="space-y-3">
          <h5 class="text-base font-medium">{{ t('api.slots') }}</h5>
          <DataTable preset="slots" :data="symbol.slotsRows" />
        </div>
      </div>
    </section>

    <section v-if="localTypes.tables.length || localTypes.unions.length" class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-xl font-semibold scroll-mt-24">{{ t('api.local_types') }}</h3>
        <p v-if="localTypes.commonTypeNames.length" class="text-sm text-muted-foreground">
          {{ t('api.common_types_note') }}
          <SLink href="/overview/common-types" class="ml-1">{{ t('api.common_types_link') }}</SLink>
        </p>
      </div>

      <TypeTable :data="localTypes.tables" />

      <UnionType
        v-for="typeItem in localTypes.unions"
        :key="typeItem.name"
        :name="typeItem.name"
        :description="typeItem.description"
        :type="typeItem.type"
      />
    </section>
  </div>
</template>
