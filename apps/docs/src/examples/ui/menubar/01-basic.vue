<script setup lang="ts">
import { shallowRef } from 'vue';
import type { AlignSide } from '@soybeanjs/headless/types';
import { SButtonIcon, SMenubar, SSelect, SSwitch } from '@soybeanjs/ui';
import type { Direction, MenubarTriggerType, MenuOptionData, SelectOptionData, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  size: ThemeSize;
  trigger: MenubarTriggerType;
  dir: Direction;
  indicatorPosition: AlignSide;
  showArrow: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  trigger: 'click',
  dir: 'ltr',
  indicatorPosition: 'start',
  showArrow: true
};

/** 选项表只有「值即文案」一种形态，用一个纯函数生成，避免多份复制粘贴。 */
const toOptions = <T extends string>(values: readonly T[]): { value: T; label: T }[] =>
  values.map(value => ({ value, label: value }));

const TRIGGER_KEYS: readonly MenubarTriggerType[] = ['click', 'hover'];
const DIR_KEYS: readonly Direction[] = ['ltr', 'rtl'];
const INDICATOR_POSITION_KEYS: readonly AlignSide[] = ['start', 'end'];

const triggerItems: SelectOptionData<MenubarTriggerType>[] = toOptions(TRIGGER_KEYS);
const dirItems: SelectOptionData<Direction>[] = toOptions(DIR_KEYS);
const indicatorPositionItems: SelectOptionData<AlignSide>[] = toOptions(INDICATOR_POSITION_KEYS);

const items: MenuOptionData<string>[] = [
  {
    value: 'file',
    label: 'File',
    children: [
      { value: 'new-tab', label: 'New Tab', shortcut: '⌘T' },
      { value: 'new-window', label: 'New Window', shortcut: '⌘N', separator: true },
      {
        value: 'share',
        label: 'Share',
        children: [
          { value: 'mail', label: 'Email Link' },
          { value: 'notes', label: 'Notes' }
        ]
      },
      { value: 'print', label: 'Print', shortcut: '⌘P' }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    children: [
      { value: 'undo', label: 'Undo', shortcut: '⌘Z' },
      { value: 'redo', label: 'Redo', shortcut: '⇧⌘Z' },
      {
        value: 'find',
        label: 'Find',
        children: [
          { value: 'search-web', label: 'Search the Web' },
          { value: 'find-next', label: 'Find Next' }
        ]
      },
      { value: 'paste', label: 'Paste' }
    ]
  },
  {
    value: 'view',
    label: 'View',
    children: [
      { value: 'reload', label: 'Reload', shortcut: '⌘R' },
      { value: 'fullscreen', label: 'Toggle Fullscreen' },
      { value: 'sidebar', label: 'Hide Sidebar', disabled: true }
    ]
  },
  {
    value: 'github',
    label: 'GitHub',
    href: 'https://github.com/soybeanjs/soybean-ui'
  }
];

const size = shallowRef(DEFAULTS.size);
const trigger = shallowRef(DEFAULTS.trigger);
const dir = shallowRef(DEFAULTS.dir);
const indicatorPosition = shallowRef(DEFAULTS.indicatorPosition);
const showArrow = shallowRef(DEFAULTS.showArrow);

const reset = (): void => {
  size.value = DEFAULTS.size;
  trigger.value = DEFAULTS.trigger;
  dir.value = DEFAULTS.dir;
  indicatorPosition.value = DEFAULTS.indicatorPosition;
  showArrow.value = DEFAULTS.showArrow;
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
        <FieldItem label="trigger">
          <SSelect v-model="trigger" :items="triggerItems" :trigger-props="{ 'aria-label': 'Trigger' }" class="w-28" />
        </FieldItem>
        <FieldItem label="dir">
          <SSelect v-model="dir" :items="dirItems" :trigger-props="{ 'aria-label': 'Direction' }" class="w-25" />
        </FieldItem>
        <FieldItem label="indicatorPosition">
          <SSelect
            v-model="indicatorPosition"
            :items="indicatorPositionItems"
            :trigger-props="{ 'aria-label': 'Indicator position' }"
            class="w-25"
          />
        </FieldItem>
        <FieldItem label="showArrow">
          <div class="h-8 flex items-center">
            <SSwitch v-model="showArrow" :control-props="{ 'aria-label': 'Show arrow' }" />
          </div>
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身，菜单弹层由组件自身渲染 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <SMenubar
        :items="items"
        :size="size"
        :trigger="trigger"
        :dir="dir"
        :indicator-position="indicatorPosition"
        :show-arrow="showArrow"
      />
    </div>
  </div>
</template>
