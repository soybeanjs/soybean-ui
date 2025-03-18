<script setup lang="ts" generic="T extends NavigationMenuItemBaseOption = NavigationMenuItemBaseOption">
import {
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps
} from '@soybean-ui/primitives';
import { omit } from '../../shared';
import SNavigationMenuRoot from './navigation-menu-root.vue';
import SNavigationMenuViewportRoot from './navigation-menu-viewport-root.vue';
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
import NavigationMenuChildLinkLabel from './navigation-menu-child-link-label.vue';
import NavigationMenuChildLinkDescription from './navigation-menu-child-link-description.vue';
import type {
  NavigationMenuEmits,
  NavigationMenuItemBaseOption,
  NavigationMenuItemOption,
  NavigationMenuProps
} from './types';

defineOptions({
  name: 'SNavigationMenu'
});

const props = defineProps<NavigationMenuProps<T>>();

const emit = defineEmits<NavigationMenuEmits<T>>();

const forwardedRootProps = useOmitForwardProps(props, [
  'items',
  'listClass',
  'linkClass',
  'triggerClass',
  'triggerIconClass',
  'contentClass',
  'forceMountContent',
  'childListClass',
  'childListItemClass',
  'childLinkClass',
  'childLinkLabelClass',
  'childLinkDescriptionClass'
]);

const forwardedRootEmits = usePickEmitAsProps(emit, ['update:modelValue']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, forwardedRootEmits);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:modelValue', 'select']);

function hasChildren(item: NavigationMenuItemOption<T>) {
  return Boolean(item.items?.length);
}

function getLinkProps(item: NavigationMenuItemOption<T>) {
  return omit(item, ['items', 'label', 'value', 'description', 'icon']);
}
</script>

<template>
  <SNavigationMenuRoot v-bind="forwardedRoot">
    <SNavigationMenuList :class="listClass">
      <template v-for="item in props.items" :key="item.value">
        <SNavigationMenuItem :class="itemClass" :value="item.value">
          <SNavigationMenuLink
            v-if="!hasChildren(item)"
            v-bind="getLinkProps(item)"
            :class="linkClass"
            @select="emit('select', item, $event)"
          >
            <slot name="link" :item="item">
              <component :is="item.icon" v-if="item.icon" />
              {{ item.label }}
            </slot>
          </SNavigationMenuLink>
          <template v-else>
            <SNavigationMenuTrigger :class="triggerClass" :icon-class="triggerIconClass">
              <slot name="trigger" :item="item">
                <component :is="item.icon" v-if="item.icon" />
                {{ item.label }}
              </slot>
            </SNavigationMenuTrigger>
            <SNavigationMenuContent
              v-bind="forwardedContentEmits"
              :class="contentClass"
              :force-mount="forceMountContent"
            >
              <slot :item="item" :name="`${item.value}-content`">
                <SNavigationMenuChildList :class="childListClass">
                  <SNavigationMenuChildListItem
                    v-for="child in item.items"
                    :key="child.value"
                    :class="childListItemClass"
                  >
                    <SNavigationMenuChildLink
                      v-bind="getLinkProps(child)"
                      :class="childLinkClass"
                      @select="emit('select', child, $event)"
                    >
                      <NavigationMenuChildLinkLabel :class="childLinkLabelClass">
                        {{ child.label }}
                      </NavigationMenuChildLinkLabel>
                      <NavigationMenuChildLinkDescription v-if="child.description" :class="childLinkDescriptionClass">
                        {{ child.description }}
                      </NavigationMenuChildLinkDescription>
                    </SNavigationMenuChildLink>
                  </SNavigationMenuChildListItem>
                </SNavigationMenuChildList>
              </slot>
            </SNavigationMenuContent>
          </template>
        </SNavigationMenuItem>
      </template>
    </SNavigationMenuList>
    <SNavigationMenuIndicator v-if="showArrow" />
    <SNavigationMenuViewportRoot>
      <SNavigationMenuViewport />
    </SNavigationMenuViewportRoot>
  </SNavigationMenuRoot>
</template>
