<script setup lang="ts" generic="T extends PageTabsOptionData, S extends DefinedValue, U extends MenuOptionData<S>">
import { computed, shallowRef } from 'vue';
import { PageTabsRoot, PageTabsItem, PageTabsClose, PageTabsPin, providePageTabsUi } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { pageTabsVariants } from '@/variants/page-tabs';
import Icon from '../icon/icon.vue';
import ContextMenu from '../context-menu/context-menu.vue';
import type { MenuOptionData } from '../menu/types';
import type { PageTabsProps, PageTabsEmits, PageTabsOptionData } from './types';

defineOptions({
  name: 'SPageTabs'
});

const props = withDefaults(defineProps<PageTabsProps<T, S, U>>(), {
  variant: 'chrome'
});

const emit = defineEmits<PageTabsEmits<U>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'variant', 'ui', 'items', 'contextMenus']);

const ui = computed(() => {
  const variants = pageTabsVariants({
    size: props.size,
    variant: props.variant
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

const reference = shallowRef<HTMLElement | null>(null);

let tabValue = '';

const onPointerEnter = (event: PointerEvent, value: string) => {
  reference.value = event.currentTarget as HTMLElement;
  tabValue = value;
  emit('enterItem', value);
};

const onSelect = (menu: U) => {
  emit('selectContextMenu', menu, tabValue);
};

providePageTabsUi(ui);
</script>

<template>
  <PageTabsRoot
    v-bind="forwardedProps"
    @update:model-value="emit('update:modelValue', $event)"
    @update:pins="emit('update:pins', $event)"
  >
    <PageTabsItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :closable="item.closable"
      @close="emit('close', item.value)"
      @pointerenter="event => onPointerEnter(event, item.value)"
    >
      <Icon v-if="item.icon" :icon="item.icon" />
      <span :class="ui.itemText">{{ item.label }}</span>
      <PageTabsPin as-child>
        <Icon icon="lucide:pin" />
      </PageTabsPin>
      <PageTabsClose as-child>
        <Icon icon="lucide:x" />
      </PageTabsClose>

      <template v-if="variant === 'chrome'">
        <svg height="100%" width="100%" viewBox="0 0 8 8" :class="ui.chromeBgLeft">
          <path d="M 0 8 A 8 8 0 0 0 8 0 L 8 8 Z" />
        </svg>
        <svg height="100%" width="100%" viewBox="0 0 8 8" :class="ui.chromeBgRight">
          <path d="M 0 0 A 8 8 0 0 0 8 8 L 0 8 Z" />
        </svg>
      </template>
      <div v-if="variant === 'slider'" :class="ui.sliderIndicator"></div>
    </PageTabsItem>

    <ContextMenu :modal="false" :items="contextMenus ?? []" :trigger-props="{ reference }" @select="onSelect" />
  </PageTabsRoot>
</template>
