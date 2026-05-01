<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import NavigationMenuContent from './navigation-menu-content.vue';
import NavigationMenuIndicator from './navigation-menu-indicator.vue';
import NavigationMenuItem from './navigation-menu-item.vue';
import NavigationMenuLink from './navigation-menu-link.vue';
import NavigationMenuList from './navigation-menu-list.vue';
import NavigationMenuRoot from './navigation-menu-root.vue';
import NavigationMenuSubList from './navigation-menu-sub-list.vue';
import NavigationMenuTrigger from './navigation-menu-trigger.vue';
import NavigationMenuViewport from './navigation-menu-viewport.vue';
import type {
  NavigationMenuCompactEmits,
  NavigationMenuCompactProps,
  NavigationMenuCompactSlots,
  NavigationMenuItemData
} from './types';

defineOptions({
  name: 'NavigationMenuCompact'
});

const props = defineProps<NavigationMenuCompactProps>();

const emit = defineEmits<NavigationMenuCompactEmits>();

const slots = defineSlots<NavigationMenuCompactSlots>();

const forwardedRootProps = useOmitProps(props, [
  'items',
  'itemProps',
  'linkProps',
  'triggerProps',
  'contentProps',
  'listProps',
  'subListProps',
  'subItemProps',
  'viewportProps',
  'indicatorProps'
]);

function isLink(item: NavigationMenuItemData) {
  return Boolean(item.to || item.href);
}

function getLinkProps(item: NavigationMenuItemData) {
  if (!isLink(item)) {
    return {};
  }

  return {
    ...props.linkProps,
    disabled: item.disabled,
    to: item.to,
    href: item.href,
    target: item.target,
    external: item.external
  };
}

function hasChildren(item: NavigationMenuItemData) {
  return Boolean(item.children?.length);
}
</script>

<template>
  <NavigationMenuRoot v-bind="forwardedRootProps" @update:model-value="emit('update:modelValue', $event)">
    <NavigationMenuList v-bind="listProps">
      <NavigationMenuItem v-for="item in items" :key="item.value" v-bind="itemProps" :value="item.value">
        <!-- Simple link item (no children) -->
        <NavigationMenuLink
          v-if="!hasChildren(item)"
          v-slot="{ isHref }"
          v-bind="getLinkProps(item)"
          @select="emit('select', $event)"
        >
          <slot name="item" :item="item">
            <slot name="item-leading" :item="item" />
            <span>{{ item.label }}</span>
            <slot name="item-trailing" :item="item" />
            <template v-if="isHref">
              <slot name="item-link-icon" :item="item">
                <Icon icon="lucide:arrow-up-right" :aria-hidden="true" />
              </slot>
            </template>
          </slot>
        </NavigationMenuLink>

        <!-- Item with children (trigger + content) -->
        <template v-else>
          <NavigationMenuTrigger v-bind="triggerProps" :disabled="item.disabled" :as-child="isLink(item)">
            <NavigationMenuLink v-if="isLink(item)" v-bind="getLinkProps(item)" @select="emit('select', $event)">
              <slot name="item" :item="item" :is-trigger="true">
                <slot name="item-leading" :item="item" />
                <span>{{ item.label }}</span>
                <slot name="item-trailing" :item="item" />
                <slot name="item-trigger-icon" :item="item">
                  <Icon icon="lucide:chevron-down" :aria-hidden="true" />
                </slot>
              </slot>
            </NavigationMenuLink>
            <template v-else>
              <slot name="item" :item="item" :is-trigger="true">
                <slot name="item-leading" :item="item" />
                <span>{{ item.label }}</span>
                <slot name="item-trailing" :item="item" />
                <slot name="item-trigger-icon" :item="item">
                  <Icon icon="lucide:chevron-down" :aria-hidden="true" />
                </slot>
              </slot>
            </template>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            v-bind="contentProps"
            @focus-outside="emit('focusOutside', $event)"
            @interact-outside="emit('interactOutside', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
            @escape-key-down="emit('escapeKeyDown', $event)"
          >
            <slot name="item-children" :item="item">
              <NavigationMenuSubList v-bind="subListProps">
                <NavigationMenuItem
                  v-for="child in item.children"
                  :key="child.value"
                  v-bind="subItemProps"
                  :value="child.value"
                >
                  <NavigationMenuLink v-bind="getLinkProps(child)" @select="emit('select', $event)">
                    <slot name="item" :item="child">
                      <slot name="item-leading" :item="child" />
                      <span>{{ child.label }}</span>
                      <span v-if="child.description">{{ child.description }}</span>
                      <slot name="item-trailing" :item="child" />
                    </slot>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuSubList>
            </slot>
          </NavigationMenuContent>
        </template>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuIndicator v-bind="indicatorProps">
      <slot name="indicator">
        <div />
      </slot>
    </NavigationMenuIndicator>
    <NavigationMenuViewport v-bind="viewportProps" />
  </NavigationMenuRoot>
</template>
