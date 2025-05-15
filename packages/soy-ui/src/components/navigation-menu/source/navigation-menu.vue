<script setup lang="ts" generic="T extends NavigationMenuItemBaseOption = NavigationMenuItemBaseOption">
import {
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps
} from '@soybean-ui/primitives';
import { omit } from '../../../shared';
import type {
  NavigationMenuEmits,
  NavigationMenuItemBaseOption,
  NavigationMenuItemOption,
  NavigationMenuProps
} from '../types';
import SNavigationMenuRoot from './navigation-menu-root.vue';
import SNavigationMenuViewport from './navigation-menu-viewport.vue';
import SNavigationMenuList from './navigation-menu-list.vue';
import SNavigationMenuItem from './navigation-menu-item.vue';
import SNavigationMenuContent from './navigation-menu-content.vue';
import SNavigationMenuTrigger from './navigation-menu-trigger.vue';
import SNavigationMenuIndicator from './navigation-menu-indicator.vue';
import SNavigationMenuLink from './navigation-menu-link.vue';
import SNavigationMenuChildLink from './navigation-menu-child-link.vue';
import SNavigationMenuChildList from './navigation-menu-child-list.vue';
import SNavigationMenuChildListItem from './navigation-menu-child-list-item.vue';

defineOptions({
  name: 'SNavigationMenu'
});

const props = defineProps<NavigationMenuProps<T>>();

const emit = defineEmits<NavigationMenuEmits<T>>();

const forwardedRootProps = useOmitForwardProps(props, [
  'class',
  'size',
  'ui',
  'items',
  'forceMountContent',
  'showArrow'
]);

const forwardedRootEmits = usePickEmitAsProps(emit, ['update:modelValue']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:modelValue', 'select']);

function hasChildren(item: NavigationMenuItemOption<T>) {
  return Boolean(item.items?.length);
}

function getLinkProps(item: NavigationMenuItemOption<T>) {
  return omit(item, ['items', 'value', 'description']);
}
</script>

<template>
  <SNavigationMenuRoot v-bind="forwardedRoot" :class="props.class || ui?.root">
    <SNavigationMenuList :class="ui?.list" :size="size">
      <template v-for="item in items" :key="item.value">
        <SNavigationMenuItem :class="ui?.item" :value="item.value">
          <SNavigationMenuLink
            v-if="!hasChildren(item)"
            v-bind="getLinkProps(item)"
            :size="size"
            :ui="ui"
            @select="emit('select', item, $event)"
          >
            <slot name="link" :item="item" />
          </SNavigationMenuLink>
          <template v-else>
            <SNavigationMenuTrigger v-bind="getLinkProps(item)" :size="size" :ui="ui" :disabled="item.disabled">
              <slot name="trigger" :item="item" />
              <template #icon>
                <slot name="trigger-icon" :item="item" />
              </template>
            </SNavigationMenuTrigger>
            <SNavigationMenuContent
              v-bind="forwardedContentEmits"
              :class="ui?.content"
              :force-mount="forceMountContent"
            >
              <slot :item="item" :name="`${item.value}-content`">
                <SNavigationMenuChildList :class="ui?.childList" :size="size">
                  <SNavigationMenuChildListItem
                    v-for="child in item.items"
                    :key="child.value"
                    :class="ui?.childListItem"
                  >
                    <SNavigationMenuChildLink
                      v-bind="getLinkProps(child)"
                      :class="ui?.childLink"
                      :size="size"
                      :ui="ui"
                      :description="child.description"
                      @select="emit('select', child, $event)"
                    />
                  </SNavigationMenuChildListItem>
                </SNavigationMenuChildList>
              </slot>
            </SNavigationMenuContent>
          </template>
        </SNavigationMenuItem>
      </template>
    </SNavigationMenuList>
    <SNavigationMenuIndicator v-if="showArrow" :size="size" :ui="ui" />
    <SNavigationMenuViewport :size="size" :ui="ui" />
  </SNavigationMenuRoot>
</template>
