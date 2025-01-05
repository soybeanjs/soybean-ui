<script setup lang="ts" generic="T extends TabsOption = TabsOption">
import { useForwardPropsEmits } from '@soybean-ui/primitive';
import STabsRoot from './tabs-root.vue';
import STabsList from './tabs-list.vue';
import STabsTrigger from './tabs-trigger.vue';
import STabsIndicatorRoot from './tabs-indicator-root.vue';
import STabsIndicator from './tabs-indicator.vue';
import STabsContent from './tabs-content.vue';
import type { TabsEmits, TabsOption, TabsProps } from './types';

defineOptions({
  name: 'STabs'
});

const {
  loop,
  items,
  listClass,
  triggerClass,
  enableIndicator = true,
  indicatorRootClass,
  indicatorClass,
  forceMountContent,
  contentClass,
  ...delegatedRootProps
} = defineProps<TabsProps<T>>();

const emit = defineEmits<TabsEmits<T['value']>>();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <STabsRoot v-bind="forwarded">
    <STabsList :class="listClass" :loop :orientation>
      <STabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="triggerClass"
        :enable-indicator
      >
        <slot name="trigger" v-bind="{ ...item, active: item.value === modelValue }">{{ item.label }}</slot>
      </STabsTrigger>
      <STabsIndicatorRoot v-if="enableIndicator" :class="indicatorRootClass" :orientation>
        <slot name="indicator">
          <STabsIndicator :class="indicatorClass" :orientation />
        </slot>
      </STabsIndicatorRoot>
    </STabsList>
    <STabsContent
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :force-mount="forceMountContent"
      :class="contentClass"
      :orientation
    >
      <slot name="content" v-bind="{ ...item, active: item.value === modelValue }" />
    </STabsContent>
  </STabsRoot>
</template>
