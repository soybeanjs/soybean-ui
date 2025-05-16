<script setup lang="ts" generic="T extends TabsOptionData = TabsOptionData">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { TabsEmits, TabsOptionData, TabsProps } from '../types';
import STabsRoot from './tabs-root.vue';
import STabsList from './tabs-list.vue';
import STabsTrigger from './tabs-trigger.vue';
import STabsIndicator from './tabs-indicator.vue';
import STabsContent from './tabs-content.vue';

defineOptions({
  name: 'STabs'
});

const {
  class: cls,
  size,
  ui,
  loop,
  items,
  enableIndicator = true,
  forceMountContent,
  ...delegatedRootProps
} = defineProps<TabsProps<T>>();

const emit = defineEmits<TabsEmits<T['value']>>();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <STabsRoot v-bind="forwarded" :class="cls || ui?.root" :size="size">
    <STabsList :class="ui?.list" :size="size" :loop="loop" :orientation="orientation">
      <STabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="ui?.trigger"
        :size="size"
        :enable-indicator="enableIndicator"
      >
        <slot name="trigger" v-bind="{ ...item, active: item.value === modelValue }">{{ item.label }}</slot>
      </STabsTrigger>
      <STabsIndicator v-if="enableIndicator" :size="size" :ui="ui" :orientation="orientation" />
    </STabsList>
    <STabsContent
      v-for="item in items"
      :key="item.value"
      :class="ui?.content"
      :size="size"
      :orientation="orientation"
      :value="item.value"
      :force-mount="forceMountContent"
    >
      <slot name="content" v-bind="{ ...item, active: item.value === modelValue }" />
    </STabsContent>
  </STabsRoot>
</template>
