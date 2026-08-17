<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { useMenuUi } from '../menu/context';
import type { DefinedValue } from '../../types';
import Icon from '../_icon/icon.vue';
import type { IconValue } from '../_icon/types';
import Link from '../link/link.vue';
import type { LinkExtraProps } from '../link/types';
import { MenuPortal, MenuOptionsCompact } from '../menu';
import type { MenuOptionData, MenuPortalProps } from '../menu';
import MenubarContent from './menubar-content.vue';
import MenubarMenu from './menubar-menu.vue';
import MenubarRoot from './menubar-root.vue';
import MenubarTrigger from './menubar-trigger.vue';
import type { MenubarCompactSlots, MenubarContentProps, MenubarTriggerProps } from './types';

/**
 * Internal list renderer for `MenubarCompact`.
 *
 * Renders the menubar root plus one `MenubarMenu` per visible item and the
 * trailing "more" menu. Extracted so `MenubarCompact` can conditionally wrap
 * the whole list in a measurement container (for `collapsible`) without
 * duplicating the markup.
 */
interface MenubarMenusProps<T extends DefinedValue = DefinedValue> {
  /** Top-level items rendered as visible triggers. */
  items: MenuOptionData<T>[];
  /** Items collapsed into the trailing "more" menu. */
  moreItems: MenuOptionData<T>[];
  /** Props forwarded to the menubar root. */
  rootProps: Record<string, unknown>;
  /** Listeners forwarded to the menubar root. */
  listeners: Record<string, unknown>;
  /** Props forwarded to the menu options of each open menu. */
  optionsProps: Record<string, unknown>;
  /** Props forwarded to link triggers. */
  linkProps?: LinkExtraProps;
  /** Props forwarded to the content of each menu. */
  contentProps: MenubarContentProps;
  /** Props forwarded to the portal of each menu. */
  portalProps?: MenuPortalProps;
  /** Resolve the effective props of a top-level trigger item. */
  getTriggerProps: (item: MenuOptionData<T>) => MenubarTriggerProps;
  /** Props forwarded to the trailing "more" trigger. */
  moreTriggerProps: Record<string, unknown>;
  /** Label of the trailing "more" trigger. */
  moreLabel?: string;
  /** Icon of the trailing "more" trigger. */
  moreIcon?: IconValue;
}

const props = defineProps<MenubarMenusProps<T>>();

const slots = defineSlots<MenubarCompactSlots<T>>();

const ui = useMenuUi();

// Menu slots (excluding `trigger` / `more-trigger`) forwarded to every
// `MenuOptionsCompact`.
const menuSlotNames = computed(() => keysOf(slots).filter(key => key !== 'trigger' && key !== 'more-trigger'));

const moreIcon = computed(() => props.moreIcon ?? 'lucide:ellipsis');
</script>

<template>
  <MenubarRoot v-bind="rootProps" v-on="listeners">
    <MenubarMenu v-for="item in items" :key="item.value" :value="item.value">
      <MenubarTrigger v-if="item.to || item.href" v-bind="getTriggerProps(item)" as-child>
        <Link
          v-slot="{ isHref }"
          v-bind="linkProps"
          :disabled="getTriggerProps(item).disabled ?? linkProps?.disabled"
          :to="item.to"
          :href="item.href"
          :target="item.target"
          :external="item.external"
        >
          <slot name="trigger" :item="item">
            <slot name="item-leading" :item="item">
              <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
            </slot>
            <span>{{ item.label }}</span>
            <slot v-if="isHref" name="item-link-icon" :item="item">
              <Icon icon="lucide:arrow-up-right" :class="ui.itemLinkIcon" />
            </slot>
            <slot name="item-trailing" :item="item" />
          </slot>
        </Link>
      </MenubarTrigger>
      <template v-else>
        <MenubarTrigger v-bind="getTriggerProps(item)">
          <slot name="trigger" :item="item">
            <slot name="item-leading" :item="item">
              <Icon v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
            </slot>
            <span>{{ item.label }}</span>
            <slot name="item-trailing" :item="item" />
          </slot>
        </MenubarTrigger>
        <MenuPortal v-bind="portalProps">
          <MenubarContent v-bind="contentProps">
            <MenuOptionsCompact v-bind="optionsProps" :items="item.children ?? []">
              <template v-for="slotName in menuSlotNames" :key="slotName" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps" />
              </template>
            </MenuOptionsCompact>
          </MenubarContent>
        </MenuPortal>
      </template>
    </MenubarMenu>
    <MenubarMenu v-if="moreItems.length">
      <MenubarTrigger v-bind="moreTriggerProps">
        <slot name="more-trigger">
          <Icon v-if="moreIcon" :icon="moreIcon" :class="ui.itemIcon" />
          <span v-if="moreLabel">{{ moreLabel }}</span>
        </slot>
      </MenubarTrigger>
      <MenuPortal v-bind="portalProps">
        <MenubarContent v-bind="contentProps">
          <MenuOptionsCompact v-bind="optionsProps" :items="moreItems">
            <template v-for="slotName in menuSlotNames" :key="slotName" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps" />
            </template>
          </MenuOptionsCompact>
        </MenubarContent>
      </MenuPortal>
    </MenubarMenu>
  </MenubarRoot>
</template>
