<script setup lang="ts" generic="T extends TabsOptionData = TabsOptionData">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import STabsRoot from './tabs-root.vue';
import STabsList from './tabs-list.vue';
import STabsTrigger from './tabs-trigger.vue';
import STabsIndicatorRoot from './tabs-indicator-root.vue';
import STabsIndicator from './tabs-indicator.vue';
import STabsContent from './tabs-content.vue';
import type { TabsEmits, TabsOptionData, TabsProps } from './types';

defineOptions({
  name: 'STabs'
});

const {
  class: cls,
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
  <STabsRoot v-bind="forwarded" :class="cls || ui?.root">
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
      <STabsIndicatorRoot v-if="enableIndicator" :class="ui?.indicatorRoot" :size="size" :orientation="orientation">
        <slot name="indicator">
          <STabsIndicator :class="ui?.indicator" :orientation="orientation" />
        </slot>
      </STabsIndicatorRoot>
    </STabsList>
    <STabsContent
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :force-mount="forceMountContent"
      :class="ui?.content"
      :size="size"
      :orientation="orientation"
    >
      <slot name="content" v-bind="{ ...item, active: item.value === modelValue }" />
    </STabsContent>
  </STabsRoot>
</template>
