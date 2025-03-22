<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Component } from 'vue';
import { useDark } from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import { SButtonIcon, SCard, SConfigProvider, SPopover, SScrollArea, STabs, SToastProvider } from 'soy-ui';
import type { ConfigProviderProps, TabsOption } from 'soy-ui';
import { DemoAccordion, DemoAlert } from '@soybean-ui/examples';
import type { ThemeConfigColor } from '@soybean-ui/unocss-preset';
import { Moon, Sun, SwatchBook } from 'lucide-vue-next';
import ThemeCustomize from '@/components/theme-customize.vue';
import UiAlertDialog from './modules/alert-dialog.vue';
import UiAspectRatio from './modules/aspect-ratio.vue';
import UiAvatar from './modules/avatar.vue';
import UiBadge from './modules/badge.vue';
import UiBreadcrumb from './modules/breadcrumb.vue';
import UiButton from './modules/button.vue';
import UiCard from './modules/card.vue';
import UiCarousel from './modules/carousel.vue';
import UiCheckbox from './modules/checkbox.vue';
import UiChip from './modules/chip.vue';
import UiCollapsible from './modules/collapsible.vue';
import UiCombobox from './modules/combobox.vue';
import UiCommand from './modules/command.vue';
import UiContextMenu from './modules/context-menu.vue';
import UiDialog from './modules/dialog.vue';
import UiDrawer from './modules/drawer.vue';
import UiDropdownMenu from './modules/dropdown-menu.vue';
import UiForm from './modules/form.vue';
import UiHoverCard from './modules/hover-card.vue';
import UiInput from './modules/input.vue';
import UiKeyboardKey from './modules/keyboard-key.vue';
import UiMenubar from './modules/menubar.vue';
import UiNavigationMenu from './modules/navigation-menu.vue';
import UiNumberField from './modules/number-field.vue';
import UiPagination from './modules/pagination.vue';
import UiPinInput from './modules/pin-input.vue';
import UiPopover from './modules/popover.vue';
import UiProgress from './modules/progress.vue';
import UiRadio from './modules/radio.vue';
import UiResizable from './modules/resizable.vue';
import UiScrollArea from './modules/scroll-area.vue';
import UiSegment from './modules/segment.vue';
import UiSelect from './modules/select.vue';
import UiSeparator from './modules/separator.vue';
import UiSheet from './modules/sheet.vue';
import UiSkeleton from './modules/skeleton.vue';
import UiSlider from './modules/slider.vue';
import UiSonner from './modules/sonner.vue';
import UiStepper from './modules/stepper.vue';
import UiSwitch from './modules/switch.vue';
import UiTabs from './modules/tabs.vue';
import UiTagsInput from './modules/tags-input.vue';
import UiTextarea from './modules/textarea.vue';
import UiToast from './modules/toast.vue';
import UiToggle from './modules/toggle.vue';
import UiToggleGroup from './modules/toggle-group.vue';
import UiTooltip from './modules/tooltip.vue';

defineOptions({
  name: 'UiPage'
});

const activeTab = useRouteQuery('tab', 'accordion' as string);

const isDark = useDark();

function toggleDark() {
  isDark.value = !isDark.value;
}

const color = ref<ThemeConfigColor>('default');
const radius = ref(0.5);

const configProviderProps = computed<ConfigProviderProps>(() => ({
  theme: {
    color: color.value,
    radius: radius.value
  }
}));

interface TabConfig extends TabsOption {
  component: Component;
}

const tabs: TabConfig[] = [
  {
    value: 'accordion',
    label: 'Accordion',
    component: DemoAccordion
  },
  {
    value: 'alert',
    label: 'Alert',
    component: DemoAlert
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
    value: 'breadcrumb',
    label: 'Breadcrumb',
    component: UiBreadcrumb
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
    value: 'carousel',
    label: 'Carousel',
    component: UiCarousel
  },
  {
    value: 'checkbox',
    label: 'Checkbox',
    component: UiCheckbox
  },
  {
    value: 'chip',
    label: 'Chip',
    component: UiChip
  },
  {
    value: 'collapsible',
    label: 'Collapsible',
    component: UiCollapsible
  },
  {
    value: 'combobox',
    label: 'Combobox',
    component: UiCombobox
  },
  {
    value: 'command',
    label: 'Command',
    component: UiCommand
  },
  {
    value: 'context-menu',
    label: 'ContextMenu',
    component: UiContextMenu
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
    value: 'form',
    label: 'Form',
    component: UiForm
  },
  {
    value: 'hover-card',
    label: 'HoverCard',
    component: UiHoverCard
  },
  {
    value: 'input',
    label: 'Input',
    component: UiInput
  },
  {
    value: 'keyboard-key',
    label: 'KeyboardKey',
    component: UiKeyboardKey
  },
  {
    value: 'menubar',
    label: 'Menubar',
    component: UiMenubar
  },
  {
    value: 'navigation-menu',
    label: 'NavigationMenu',
    component: UiNavigationMenu
  },
  {
    value: 'number-field',
    label: 'NumberField',
    component: UiNumberField
  },
  {
    value: 'pagination',
    label: 'Pagination',
    component: UiPagination
  },
  {
    value: 'pin-input',
    label: 'PinInput',
    component: UiPinInput
  },
  {
    value: 'popover',
    label: 'Popover',
    component: UiPopover
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
    value: 'resizable',
    label: 'Resizable',
    component: UiResizable
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
    value: 'sheet',
    label: 'Sheet',
    component: UiSheet
  },
  {
    value: 'skeleton',
    label: 'Skeleton',
    component: UiSkeleton
  },
  {
    value: 'slider',
    label: 'Slider',
    component: UiSlider
  },
  {
    value: 'sonner',
    label: 'Sonner',
    component: UiSonner
  },
  {
    value: 'stepper',
    label: 'Stepper',
    component: UiStepper
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
    value: 'tags-input',
    label: 'TagsInput',
    component: UiTagsInput
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
    value: 'toast',
    label: 'Toast',
    component: UiToast
  },
  {
    value: 'toggle-group',
    label: 'ToggleGroup',
    component: UiToggleGroup
  },
  {
    value: 'tooltip',
    label: 'Tooltip',
    component: UiTooltip
  }
];
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <SToastProvider>
      <div class="h-full p-16px">
        <SCard title="Soybean UI Components" class="h-full lt-sm:h-auto">
          <template #extra>
            <div>
              <SPopover content-class="z-15" side="bottom" align="end">
                <template #trigger>
                  <SButtonIcon size="lg">
                    <SwatchBook />
                  </SButtonIcon>
                </template>
                <ThemeCustomize v-model:color="color" v-model:radius="radius" />
              </SPopover>
              <SButtonIcon size="lg" @click="toggleDark">
                <Sun v-if="isDark" />
                <Moon v-else />
              </SButtonIcon>
            </div>
          </template>
          <STabs
            v-model="activeTab"
            :items="tabs"
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
          </STabs>
        </SCard>
      </div>
    </SToastProvider>
  </SConfigProvider>
</template>
