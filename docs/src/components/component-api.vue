<script setup lang="ts">
import { getComponentApiSections } from './tables/generated-api';
import { provideTypeRenderContext, typeToVNode } from './tables/type-anchor';

interface Props {
  component: string;
}

const props = defineProps<Props>();

const { t } = useI18n();

const apiLayers = computed(() => getComponentApiSections(props.component));

provideTypeRenderContext(() => ({
  component: props.component,
  activePreviewNames: []
}));

const layerTitleMap: Record<'ui' | 'headless', string> = {
  ui: 'api.ui_layer',
  headless: 'api.headless_layer'
};
</script>

<template>
  <div class="space-y-8">
    <section v-for="layer in apiLayers" :key="layer.key" class="space-y-5">
      <div class="flex flex-wrap items-center gap-3 border-b border-border/60 pb-4">
        <h3 class="scroll-mt-24 text-2xl font-bold tracking-[-0.03em] text-foreground">
          {{ t(layerTitleMap[layer.key]) }}
        </h3>
        <SBadge size="xs" color="primary">{{ layer.symbols.length }}</SBadge>
      </div>

      <SCard
        v-for="symbol in layer.symbols"
        :key="symbol.key"
        size="sm"
        split
        class="overflow-hidden border-border/60 bg-background/78 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
      >
        <template #title>
          <h4 class="scroll-mt-24 text-lg font-semibold tracking-[-0.02em] text-foreground">
            <component :is="typeToVNode(symbol.displayName)" />
          </h4>
        </template>

        <template #extra>
          <div class="flex flex-wrap items-center gap-2">
            <SBadge v-if="symbol.propsRows.length" size="xs" color="primary">
              {{ symbol.propsRows.length }} {{ t('api.props') }}
            </SBadge>
            <SBadge v-if="symbol.emitsRows.length" size="xs" color="warning">
              {{ symbol.emitsRows.length }} {{ t('api.emits') }}
            </SBadge>
            <SBadge v-if="symbol.slotsRows.length" size="xs" color="success">
              {{ symbol.slotsRows.length }} {{ t('api.slots') }}
            </SBadge>
          </div>
        </template>

        <template #default>
          <div class="space-y-5">
            <div v-if="symbol.propsRows.length" class="space-y-3">
              <h5 class="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {{ t('api.props') }}
              </h5>
              <DataTable preset="props" :data="symbol.propsRows" />
            </div>

            <div v-if="symbol.emitsRows.length" class="space-y-3">
              <h5 class="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {{ t('api.emits') }}
              </h5>
              <DataTable preset="emits" :data="symbol.emitsRows" />
            </div>

            <div v-if="symbol.slotsRows.length" class="space-y-3">
              <h5 class="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {{ t('api.slots') }}
              </h5>
              <DataTable preset="slots" :data="symbol.slotsRows" />
            </div>
          </div>
        </template>
      </SCard>
    </section>
  </div>
</template>
