<script setup lang="ts">
import type { Component } from 'vue';
import { useDark } from '@vueuse/core';
import { SButtonIcon, SCard, SScrollArea, Stabs } from 'soybean-ui';
import type { TabsOption } from 'soybean-ui';
import { Moon, Sun } from 'lucide-vue-next';
import UiAccordion from './modules/accordion.vue';
import UiAlert from './modules/alert.vue';
import UiAlertDialog from './modules/alert-dialog.vue';
import UiAspectRatio from './modules/aspect-ratio.vue';
import UiAvatar from './modules/avatar.vue';
import UiBadge from './modules/badge.vue';
import UiButton from './modules/button.vue';
import UiCard from './modules/card.vue';
import UiCheckbox from './modules/checkbox.vue';
import UiCollapsible from './modules/collapsible.vue';
import UiDialog from './modules/dialog.vue';
import UiDrawer from './modules/drawer.vue';
import UiDropdownMenu from './modules/dropdown-menu.vue';
import UiInput from './modules/input.vue';
import UiPinInput from './modules/pin-input.vue';
import UiPopover from './modules/popover.vue';
import UiProgress from './modules/progress.vue';
import UiRadio from './modules/radio.vue';
import UiScrollArea from './modules/scroll-area.vue';
import UiSegment from './modules/segment.vue';
import UiSelect from './modules/select.vue';
import UiSeparator from './modules/separator.vue';
import UiSwitch from './modules/switch.vue';
import UiTabs from './modules/tabs.vue';
import UiTextarea from './modules/textarea.vue';
import UiToggle from './modules/toggle.vue';
import UiToggleGroup from './modules/toggle-group.vue';
import UITooltip from './modules/tooltip.vue';

defineOptions({
  name: 'UiPage'
});

const isDark = useDark();

function toggleDark() {
  isDark.value = !isDark.value;
}

interface TabConfig extends TabsOption {
  component: Component;
}

const tabs: TabConfig[] = [
  {
    value: 'accordion',
    label: 'Accordion',
    component: UiAccordion
  },
  {
    value: 'alert',
    label: 'Alert',
    component: UiAlert
  },
  {
    value: 'alert-dialog',
    label: 'AlertDialog',
    component: UiAlertDialog
  },
  {
    value: 'aspect-ratio',
    label: 'AspectRatio',
    component: UiAspectRatio
  },
  {
    value: 'avatar',
    label: 'Avatar',
    component: UiAvatar
  },
  {
    value: 'badge',
    label: 'Badge',
    component: UiBadge
  },
  {
    value: 'button',
    label: 'Button',
    component: UiButton
  },
  {
    value: 'card',
    label: 'Card',
    component: UiCard
  },
  {
    value: 'checkbox',
    label: 'Checkbox',
    component: UiCheckbox
  },
  {
    value: 'collapsible',
    label: 'Collapsible',
    component: UiCollapsible
  },
  {
    value: 'dialog',
    label: 'Dialog',
    component: UiDialog
  },
  {
    value: 'drawer',
    label: 'Drawer',
    component: UiDrawer
  },
  {
    value: 'dropdown-menu',
    label: 'DropdownMenu',
    component: UiDropdownMenu
  },
  {
    value: 'input',
    label: 'Input',
    component: UiInput
  },
  {
    value: 'popover',
    label: 'Popover',
    component: UiPopover
  },
  {
    value: 'pin-input',
    label: 'PinInput',
    component: UiPinInput
  },
  {
    value: 'progress',
    label: 'Progress',
    component: UiProgress
  },
  {
    value: 'radio',
    label: 'Radio',
    component: UiRadio
  },
  {
    value: 'scroll-area',
    label: 'ScrollArea',
    component: UiScrollArea
  },
  {
    value: 'segment',
    label: 'Segment',
    component: UiSegment
  },
  {
    value: 'select',
    label: 'Select',
    component: UiSelect
  },
  {
    value: 'separator',
    label: 'Separator',
    component: UiSeparator
  },
  {
    value: 'switch',
    label: 'Switch',
    component: UiSwitch
  },
  {
    value: 'tabs',
    label: 'Tabs',
    component: UiTabs
  },
  {
    value: 'textarea',
    label: 'Textarea',
    component: UiTextarea
  },
  {
    value: 'toggle',
    label: 'Toggle',
    component: UiToggle
  },
  {
    value: 'toggle-group',
    label: 'ToggleGroup',
    component: UiToggleGroup
  },
  {
    value: 'tooltip',
    label: 'Tooltip',
    component: UITooltip
  }
] satisfies TabConfig[];
</script>

<template>
  <div class="h-full p-16px">
    <SCard title="Soybean UI Components" class="h-full lt-sm:h-auto">
      <template #extra>
        <SButtonIcon size="lg" @click="toggleDark">
          <Sun v-if="isDark" />
          <Moon v-else />
        </SButtonIcon>
      </template>
      <Stabs
        default-value="accordion"
        :options="tabs"
        :enable-indicator="false"
        class="h-full"
        list-class="flex-wrap justify-start"
        trigger-class="flex-none max-w-120px w-1/3"
      >
        <template #content="{ component }">
          <SScrollArea class="h-full">
            <div class="p-18px">
              <component :is="component" />
            </div>
          </SScrollArea>
        </template>
      </Stabs>
    </SCard>
  </div>
</template>

<style scoped></style>
