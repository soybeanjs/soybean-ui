<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../_icon/icon.vue';
import type { LinkProps } from '../link/types';
import { useNavMenuRootContext, useNavMenuUi } from './context';
import NavMenuContent from './nav-menu-content.vue';
import NavMenuItem from './nav-menu-item.vue';
import NavMenuLink from './nav-menu-link.vue';
import NavMenuTrigger from './nav-menu-trigger.vue';
import type {
  NavMenuOptionData,
  NavMenuOptionCompactEmits,
  NavMenuOptionCompactProps,
  NavMenuOptionCompactSlots
} from './types';

defineOptions({
  name: 'NavMenuOptionCompact'
});

const props = defineProps<NavMenuOptionCompactProps>();

const emit = defineEmits<NavMenuOptionCompactEmits>();

defineSlots<NavMenuOptionCompactSlots>();

const ui = useNavMenuUi();

const { modelValue, disableHoverTrigger, onItemDismiss } = useNavMenuRootContext('NavMenuOptionCompact');

// A root-level leaf link has no flyout to show: entering it while another menu is open
// (hover-driven) must close that menu, instead of the shared corridor keeping it open.
const onLeafPointerEnter = () => {
  if (disableHoverTrigger.value || !modelValue.value) return;
  onItemDismiss();
};

const isLink = computed(() => Boolean(props.item.to || props.item.href));

const linkProps = computed<LinkProps>(() =>
  isLink.value
    ? {
        ...props.linkProps,
        disabled: props.item.disabled ?? props.linkProps?.disabled,
        to: props.item.to,
        href: props.item.href,
        target: props.item.target,
        external: props.item.external
      }
    : {}
);

function childLinkProps(child: NavMenuOptionData): LinkProps {
  return {
    ...props.linkProps,
    disabled: child.disabled ?? props.linkProps?.disabled,
    to: child.to,
    href: child.href,
    target: child.target,
    external: child.external
  };
}
</script>

<template>
  <NavMenuItem v-bind="itemProps" :value="item.value">
    <!-- leaf item: a single link; entering it closes any open menu -->
    <NavMenuLink
      v-if="!item.children?.length"
      v-bind="linkProps"
      @pointerenter="onLeafPointerEnter"
      @select="emit('select', $event)"
    >
      <slot name="item" :item="item">
        <slot name="item-leading" :item="item">
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
        </slot>
        <span>{{ item.label }}</span>
        <slot name="item-trailing" :item="item" />
      </slot>
    </NavMenuLink>

    <!-- item with children: trigger + floating content with sub links -->
    <template v-else>
      <NavMenuTrigger v-bind="triggerProps" :disabled="item.disabled" :as-child="isLink">
        <component :is="isLink ? NavMenuLink : 'template'" v-bind="linkProps" @select="emit('select', $event)">
          <slot name="item" :item="item" :is-trigger="true">
            <slot name="item-leading" :item="item">
              <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
            </slot>
            <span>{{ item.label }}</span>
            <slot name="item-trailing" :item="item" />
            <slot name="item-trigger-icon" :item="item">
              <Icon icon="lucide:chevron-down" :class="ui.triggerIcon" />
            </slot>
          </slot>
        </component>
      </NavMenuTrigger>
      <NavMenuContent v-bind="contentProps">
        <ul :class="ui.subList" data-soybean-nav-menu-sub-list>
          <NavMenuLink
            v-for="child in item.children"
            :key="child.value"
            v-slot="slotProps"
            v-bind="childLinkProps(child)"
            sub
            @select="emit('select', $event)"
          >
            <slot name="item" :item="child">
              <Icon v-if="child.icon" :icon="child.icon" :class="ui.itemIcon" />
              <div :class="ui.subLinkContent">
                <span :class="ui.subLinkLabel">{{ child.label }}</span>
                <p v-if="child.description" :class="ui.subLinkDescription">{{ child.description }}</p>
              </div>
              <Icon v-if="slotProps?.isHref" icon="lucide:arrow-up-right" :class="ui.linkIcon" />
            </slot>
          </NavMenuLink>
        </ul>
      </NavMenuContent>
    </template>
  </NavMenuItem>
</template>
