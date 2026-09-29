<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButtonIcon, SCommand, SInput, SSelect, SSwitch } from '@soybeanjs/ui';
import type { CommandOptionData, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  size: ThemeSize;
  clearable: boolean;
  disabled: boolean;
  placeholder: string;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  clearable: false,
  disabled: false,
  placeholder: 'Type a command or search...'
};

const items: CommandOptionData[] = [
  {
    label: 'Suggestions',
    value: 'suggestions',
    separator: true,
    items: [
      {
        label: 'Calendar',
        value: 'calendar',
        icon: 'lucide:calendar'
      },
      {
        label: 'Search Emoji',
        value: 'search-emoji',
        icon: 'lucide:smile'
      },
      {
        label: 'Launch',
        value: 'launch',
        icon: 'lucide:rocket'
      }
    ]
  },
  {
    label: 'Settings',
    value: 'settings',
    separator: true,
    items: [
      {
        label: 'Profile',
        value: 'profile',
        icon: 'lucide:user',
        shortcut: ['command', 'p']
      },
      {
        label: 'Mail',
        value: 'mail',
        icon: 'lucide:mail',
        shortcut: ['command', 'm']
      },
      {
        label: 'Settings',
        value: 'settings',
        icon: 'lucide:settings',
        shortcut: ['command', 's']
      }
    ]
  },
  {
    label: 'Help',
    value: 'help',
    icon: 'lucide:help-circle',
    shortcut: ['command', 'h']
  }
];

const size = shallowRef(DEFAULTS.size);
const clearable = shallowRef(DEFAULTS.clearable);
const disabled = shallowRef(DEFAULTS.disabled);
const placeholder = shallowRef(DEFAULTS.placeholder);

const reset = (): void => {
  size.value = DEFAULTS.size;
  clearable.value = DEFAULTS.clearable;
  disabled.value = DEFAULTS.disabled;
  placeholder.value = DEFAULTS.placeholder;
};
</script>

<template>
  <div>
    <!-- 控制区：灰底卡片上排属性表单，改动即时反映到下面的预览；容器变窄时自动降列，控件不会被压到溢出 -->
    <!-- defer 不能省：宿主区域和示例在同一棵子树里挂载，同步解析时它还没被插进文档 -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="size">
          <SSelect v-model="size" :items="themeSizeOptions" :trigger-props="{ 'aria-label': 'Size' }" class="w-25" />
        </FieldItem>
        <FieldItem label="clearable">
          <div class="h-8 flex items-center">
            <SSwitch v-model="clearable" :control-props="{ 'aria-label': 'Clearable' }" />
          </div>
        </FieldItem>
        <FieldItem label="disabled">
          <div class="h-8 flex items-center">
            <SSwitch v-model="disabled" :control-props="{ 'aria-label': 'Disabled' }" />
          </div>
        </FieldItem>
        <FieldItem label="placeholder">
          <SInput v-model="placeholder" aria-label="Placeholder" />
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <SCommand
        class="w-80 lt-md:w-auto border rounded-lg shadow-md"
        :items="items"
        :size="size"
        :clearable="clearable"
        :disabled="disabled"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
