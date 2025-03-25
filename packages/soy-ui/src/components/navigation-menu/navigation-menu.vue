<script setup lang="ts" generic="T extends NavigationMenuItemBaseOption = NavigationMenuItemBaseOption">
import { computed } from 'vue';
import {
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickEmitAsProps
} from '@soybean-ui/primitives';
import { useThemeSize } from '../../context/theme';
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

const themeSize = useThemeSize();

const size = computed(() => props.size || themeSize.value);

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
  return omit(item, ['items', 'label', 'value', 'description', 'icon']);
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
            :class="ui?.link"
            :size="size"
            @select="emit('select', item, $event)"
          >
            <slot name="link" :item="item">
              <component :is="item.icon" v-if="item.icon" />
              {{ item.label }}
            </slot>
          </SNavigationMenuLink>
          <template v-else>
            <SNavigationMenuTrigger :class="ui?.trigger" :size="size" :icon-class="ui?.triggerIcon">
              <slot name="trigger" :item="item">
                <component :is="item.icon" v-if="item.icon" />
                {{ item.label }}
              </slot>
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
                      @select="emit('select', child, $event)"
                    >
                      <NavigationMenuChildLinkLabel :class="ui?.childLinkLabel" :size="size">
                        {{ child.label }}
                      </NavigationMenuChildLinkLabel>
                      <NavigationMenuChildLinkDescription
                        v-if="child.description"
                        :class="ui?.childLinkDescription"
                        :size="size"
                      >
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
    <SNavigationMenuIndicator v-if="showArrow" :class="ui?.indicator" :size="size" :arrow-class="ui?.arrow" />
    <SNavigationMenuViewportRoot :class="ui?.viewportRoot">
      <SNavigationMenuViewport :class="ui?.viewport" :size="size" />
    </SNavigationMenuViewportRoot>
  </SNavigationMenuRoot>
</template>
