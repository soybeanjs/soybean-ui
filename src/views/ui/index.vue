<script setup lang="ts">
import type { Component } from 'vue';
import { useDark } from '@vueuse/core';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@soybean-ui/shadcn-ui';
import { SButtonIcon } from 'soybean-ui';
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
import UiInput from './modules/input.vue';
import UiPopover from './modules/popover.vue';
import UiRadio from './modules/radio.vue';
import UiSelect from './modules/select.vue';
import UiProgress from './modules/progress.vue';

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
    key: 'radio',
    label: 'Radio',
    component: UiRadio
  },
  {
    key: 'select',
    label: 'Select',
    component: UiSelect
  },
  {
    key: 'progress',
    label: 'Progress',
    component: UiProgress
  }
];
</script>

<template>
  <div class="h-full p-16px">
    <Card class="h-full flex-col-stretch">
      <CardHeader class="flex flex-row justify-between">
        <CardTitle>Soybean UI Components</CardTitle>
        <SButtonIcon size="lg" @click="toggleDark">
          <Sun v-if="isDark" />
          <Moon v-else />
        </SButtonIcon>
      </CardHeader>
      <CardContent class="flex-1-hidden">
        <Tabs default-value="accordion" class="h-full flex-col-stretch">
          <TabsList class="h-auto w-full flex-wrap justify-start gap-y-8px">
            <TabsTrigger v-for="tab in tabs" :key="tab.key" class="max-w-120px w-1/3" :value="tab.key">
              {{ tab.label }}
            </TabsTrigger>
          </TabsList>
          <TabsContent v-for="tab in tabs" :key="tab.key" :value="tab.key" class="flex-1-hidden">
            <ScrollArea class="h-full">
              <div class="p-18px">
                <component :is="tab.component" />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
