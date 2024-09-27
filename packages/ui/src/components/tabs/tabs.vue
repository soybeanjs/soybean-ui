<script setup lang="ts" generic="T extends TabsOption = TabsOption">
import { useForwardPropsEmits } from 'radix-vue';
import type { TabsRootEmits } from 'radix-vue';
import STabsRoot from './tabs-root.vue';
import STabsList from './tabs-list.vue';
import STabsTrigger from './tabs-trigger.vue';
import STabsIndicatorRoot from './tabs-indicator-root.vue';
import STabsIndicator from './tabs-indicator.vue';
import STabsContent from './tabs-content.vue';
import type { TabsOption, TabsProps } from './types';

defineOptions({
  name: 'STabs'
});

const {
  loop,
  options,
  listClass,
  triggerClass,
  enableIndicator = true,
  indicatorRootClass,
  indicatorClass,
  forceMountContent,
  contentClass,
  ...delegatedRootProps
} = defineProps<TabsProps<T>>();

const emit = defineEmits<TabsRootEmits<T['value']>>();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);
</script>

<template>
  <STabsRoot v-bind="forwarded">
    <STabsList :class="listClass" :loop="loop" :orientation="orientation">
      <STabsTrigger
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="triggerClass"
        :enable-indicator="enableIndicator"
      >
        <slot name="trigger" v-bind="{ ...item, active: item.value === modelValue }">{{ item.label }}</slot>
      </STabsTrigger>
      <STabsIndicatorRoot v-if="enableIndicator" :class="indicatorRootClass" :orientation="orientation">
        <slot name="indicator">
          <STabsIndicator :class="indicatorClass" :orientation="orientation" />
        </slot>
      </STabsIndicatorRoot>
    </STabsList>
    <STabsContent
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      :force-mount="forceMountContent"
      :class="contentClass"
      :orientation="orientation"
    >
      <slot name="content" v-bind="{ ...item, active: item.value === modelValue }" />
    </STabsContent>
  </STabsRoot>
</template>

<style scoped></style>
