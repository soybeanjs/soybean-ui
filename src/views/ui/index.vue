<script setup lang="ts">
import type { Component } from 'vue';
import { useDark } from '@vueuse/core';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@soybean-ui/shadcn-ui';
import { SButtonIcon, SCard, SScrollArea } from 'soybean-ui';
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
import UiSelect from './modules/select.vue';
import UiSeparator from './modules/separator.vue';
import UiSwitch from './modules/switch.vue';
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

interface TabConfig {
  key: string;
  label: string;
  component: Component;
}

const tabs: TabConfig[] = [
  {
    key: 'accordion',
    label: 'Accordion',
    component: UiAccordion
  },
  {
    key: 'alert',
    label: 'Alert',
    component: UiAlert
  },
  {
    key: 'alert-dialog',
    label: 'AlertDialog',
    component: UiAlertDialog
  },
  {
    key: 'aspect-ratio',
    label: 'AspectRatio',
    component: UiAspectRatio
  },
  {
    key: 'avatar',
    label: 'Avatar',
    component: UiAvatar
  },
  {
    key: 'badge',
    label: 'Badge',
    component: UiBadge
  },
  {
    key: 'button',
    label: 'Button',
    component: UiButton
  },
  {
    key: 'card',
    label: 'Card',
    component: UiCard
  },
  {
    key: 'checkbox',
    label: 'Checkbox',
    component: UiCheckbox
  },
  {
    key: 'collapsible',
    label: 'Collapsible',
    component: UiCollapsible
  },
  {
    key: 'dialog',
    label: 'Dialog',
    component: UiDialog
  },
  {
    key: 'drawer',
    label: 'Drawer',
    component: UiDrawer
  },
  {
    key: 'dropdown-menu',
    label: 'DropdownMenu',
    component: UiDropdownMenu
  },
  {
    key: 'input',
    label: 'Input',
    component: UiInput
  },
  {
    key: 'popover',
    label: 'Popover',
    component: UiPopover
  },
  {
    key: 'pin-input',
    label: 'PinInput',
    component: UiPinInput
  },
  {
    key: 'progress',
    label: 'Progress',
    component: UiProgress
  },
  {
    key: 'radio',
    label: 'Radio',
    component: UiRadio
  },
  {
    key: 'scroll-area',
    label: 'ScrollArea',
    component: UiScrollArea
  },
  {
    key: 'select',
    label: 'Select',
    component: UiSelect
  },
  {
    key: 'separator',
    label: 'Separator',
    component: UiSeparator
  },
  {
    key: 'switch',
    label: 'Switch',
    component: UiSwitch
  },
  {
    key: 'textarea',
    label: 'Textarea',
    component: UiTextarea
  },
  {
    key: 'toggle',
    label: 'Toggle',
    component: UiToggle
  },
  {
    key: 'toggle-group',
    label: 'ToggleGroup',
    component: UiToggleGroup
  },
  {
    key: 'tooltip',
    label: 'Tooltip',
    component: UITooltip
  }
];
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
      <Tabs default-value="accordion" class="h-full flex-col-stretch">
        <TabsList class="h-auto w-full flex-wrap justify-start gap-y-8px">
          <TabsTrigger v-for="tab in tabs" :key="tab.key" class="max-w-120px w-1/3" :value="tab.key">
            {{ tab.label }}
          </TabsTrigger>
        </TabsList>
        <TabsContent v-for="tab in tabs" :key="tab.key" :value="tab.key" class="flex-1-hidden">
          <SScrollArea class="h-full">
            <div class="p-18px">
              <component :is="tab.component" />
            </div>
          </SScrollArea>
        </TabsContent>
      </Tabs>
    </SCard>
  </div>
</template>

<style scoped></style>
