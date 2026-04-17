<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import { usePickProps, useForwardListeners } from '../../composables';
import type { DefinedValue } from '../../types';
import IconRender from '../icon/icon-render.vue';
import Link from '../link/link.vue';
import { MenuPortal, MenuOptionsCompact } from '../menu';
import { useMenuUi } from '../menu/context';
import MenubarRoot from './menubar-root.vue';
import MenubarMenu from './menubar-menu.vue';
import MenubarTrigger from './menubar-trigger.vue';
import MenubarContent from './menubar-content.vue';
import type { MenubarCompactProps, MenubarCompactEmits, MenubarCompactSlots } from './types';

defineOptions({
  name: 'MenubarCompact'
});

const props = defineProps<MenubarCompactProps<T>>();

const emit = defineEmits<MenubarCompactEmits<T>>();

const slots = defineSlots<MenubarCompactSlots<T>>();

const forwardedRootProps = usePickProps(props, ['as', 'modelValue', 'defaultValue', 'dir', 'loop']);

const forwardedOptionsProps = usePickProps(props, [
  'items',
  'activeValue',
  'itemProps',
  'linkProps',
  'groupProps',
  'groupLabelProps',
  'portalProps',
  'subTriggerProps',
  'subContentProps',
  'separatorProps',
  'shortcutProps'
]);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots).filter(key => key !== 'trigger'));

const ui = useMenuUi();

const triggerProps = computed(() => {
  return {
    ...props.triggerProps,
    disabled: props.disabled ?? props.triggerProps?.disabled
  };
});

const contentProps = computed(() => {
  return {
    ...props.contentProps,
    popupProps: props.popupProps ?? props.contentProps?.popupProps,
    placement: props.placement ?? props.contentProps?.placement,
    sideOffset: props.contentProps?.sideOffset ?? (props.showArrow ? 0 : 8)
  };
});
</script>

<template>
  <MenubarRoot v-bind="forwardedRootProps" v-on="listeners">
    <MenubarMenu v-for="item in items" :key="item.value" :value="item.value">
      <MenubarTrigger v-if="item.to || item.href" v-bind="triggerProps" as-child>
        <Link
          v-slot="{ isHref }"
          v-bind="linkProps"
          :disabled="item.disabled"
          :to="item.to"
          :href="item.href"
          :target="item.target"
          :external="item.external"
        >
          <slot name="trigger" :item="item">
            <slot name="item-leading" :item="item">
              <IconRender v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
            </slot>
            <span>{{ item.label }}</span>
            <slot v-if="isHref" name="item-link-icon" :item="item">
              <IconRender icon="lucide:arrow-up-right" :class="ui.itemLinkIcon" />
            </slot>
            <slot name="item-trailing" :item="item" />
          </slot>
        </Link>
      </MenubarTrigger>
      <template v-else>
        <MenubarTrigger v-bind="triggerProps">
          <slot name="trigger" :item="item">
            <slot name="item-leading" :item="item">
              <IconRender v-if="item.icon" :icon="item.icon" :class="ui.itemIcon" />
            </slot>
            <span>{{ item.label }}</span>
            <slot name="item-trailing" :item="item" />
          </slot>
        </MenubarTrigger>
        <MenuPortal v-bind="portalProps">
          <MenubarContent v-bind="contentProps">
            <MenuOptionsCompact v-bind="forwardedOptionsProps" :items="item.children ?? []">
              <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps" />
              </template>
            </MenuOptionsCompact>
          </MenubarContent>
        </MenuPortal>
      </template>
    </MenubarMenu>
  </MenubarRoot>
</template>
