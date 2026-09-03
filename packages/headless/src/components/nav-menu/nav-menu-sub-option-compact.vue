<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '../../shared';
import Icon from '../_icon/icon.vue';
import type { LinkProps } from '../link/types';
import { PopperSub } from '../popper';
import { useNavMenuUi } from './context';
import NavMenuLink from './nav-menu-link.vue';
import NavMenuSubContent from './nav-menu-sub-content.vue';
import NavMenuSubTrigger from './nav-menu-sub-trigger.vue';
import type {
  NavMenuOptionData,
  NavMenuSubOptionCompactEmits,
  NavMenuSubOptionCompactProps,
  NavMenuSubOptionCompactSlots
} from './types';

defineOptions({
  name: 'NavMenuSubOptionCompact'
});

const props = defineProps<NavMenuSubOptionCompactProps>();

const emit = defineEmits<NavMenuSubOptionCompactEmits>();

const slots = defineSlots<NavMenuSubOptionCompactSlots>();

const ui = useNavMenuUi();

const slotNames = computed(() => keysOf(slots));

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
  <!-- leaf sub item: a plain link -->
  <NavMenuLink v-if="!item.children?.length" v-slot="slotProps" v-bind="linkProps" sub @select="emit('select', $event)">
    <slot name="item" :item="item">
      <slot name="item-leading" :item="item">
        <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
      </slot>
      <div :class="ui.subLinkContent">
        <span :class="ui.subLinkLabel">{{ item.label }}</span>
        <p v-if="item.description" :class="ui.subLinkDescription">{{ item.description }}</p>
      </div>
      <slot name="item-trailing" :item="item" />
      <Icon v-if="slotProps?.isHref" icon="lucide:arrow-up-right" :class="ui.linkIcon" />
    </slot>
  </NavMenuLink>

  <!-- branch sub item: a nested flyout opening to the side -->
  <PopperSub v-else>
    <NavMenuSubTrigger v-bind="subTriggerProps" :disabled="item.disabled">
      <slot name="item" :item="item">
        <slot name="item-leading" :item="item">
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
        </slot>
        <div :class="ui.subLinkContent">
          <span :class="ui.subLinkLabel">{{ item.label }}</span>
          <p v-if="item.description" :class="ui.subLinkDescription">{{ item.description }}</p>
        </div>
        <slot name="item-trailing" :item="item" />
        <slot name="item-trigger-icon" :item="item">
          <Icon icon="lucide:chevron-right" :class="ui.subTriggerIcon" />
        </slot>
      </slot>
    </NavMenuSubTrigger>
    <NavMenuSubContent v-bind="subContentProps">
      <ul :class="ui.subList" data-soybean-nav-menu-sub-list>
        <NavMenuSubOptionCompact
          v-for="child in item.children"
          :key="child.value"
          :item="child"
          :link-props="childLinkProps(child)"
          :sub-trigger-props="subTriggerProps"
          :sub-content-props="subContentProps"
          @select="emit('select', $event)"
        >
          <template v-for="slotName in slotNames" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
          </template>
        </NavMenuSubOptionCompact>
      </ul>
    </NavMenuSubContent>
  </PopperSub>
</template>
