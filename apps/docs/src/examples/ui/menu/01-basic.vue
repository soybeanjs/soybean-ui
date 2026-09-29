<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { AlignSide } from '@soybeanjs/headless/types';
import { SButton, SButtonIcon, SDropdownMenuWrapper, SMenuOptions, SSelect, SSwitch } from '@soybeanjs/ui';
import type { MenuOptionData, SelectOptionData, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  size: ThemeSize;
  indicatorPosition: AlignSide;
  showHidden: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  indicatorPosition: 'start',
  showHidden: false
};

/** 选项表只有「值即文案」一种形态，用一个纯函数生成，避免多份复制粘贴。 */
const toOptions = <T extends string>(values: readonly T[]): { value: T; label: T }[] =>
  values.map(value => ({ value, label: value }));

const INDICATOR_POSITION_KEYS: readonly AlignSide[] = ['start', 'end'];

const indicatorPositionItems: SelectOptionData<AlignSide>[] = toOptions(INDICATOR_POSITION_KEYS);

const size = shallowRef(DEFAULTS.size);
const indicatorPosition = shallowRef(DEFAULTS.indicatorPosition);
const showHidden = shallowRef(DEFAULTS.showHidden);

/** `hidden` 是数据能力：开关只决定「Delete」是否可见，「Internal channel」永远隐藏。 */
const items = computed<MenuOptionData<string>[]>(() => [
  { label: 'My Account', value: 'my-account', isGroupLabel: true },
  { label: 'Profile', value: 'profile', icon: 'lucide:user', shortcut: '⇧⌘P' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings', shortcut: '⌘S' },
  { label: 'Delete', value: 'delete', icon: 'lucide:trash', hidden: !showHidden.value },
  {
    label: 'Share',
    value: 'share',
    children: [
      { label: 'Email', value: 'email' },
      { label: 'Internal channel', value: 'internal', hidden: true }
    ]
  },
  {
    label: 'Theme',
    value: 'theme',
    children: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' }
    ]
  }
]);

function handleSelect(item: MenuOptionData<string>) {
  console.log('Selected:', item.value);
}

const reset = (): void => {
  size.value = DEFAULTS.size;
  indicatorPosition.value = DEFAULTS.indicatorPosition;
  showHidden.value = DEFAULTS.showHidden;
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
        <FieldItem label="indicatorPosition">
          <SSelect
            v-model="indicatorPosition"
            :items="indicatorPositionItems"
            :trigger-props="{ 'aria-label': 'Indicator position' }"
            class="w-25"
          />
        </FieldItem>
        <FieldItem label="showHidden">
          <div class="h-8 flex items-center">
            <SSwitch v-model="showHidden" :control-props="{ 'aria-label': 'Show hidden item' }" />
          </div>
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放触发按钮，菜单弹层由组件自身渲染 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <SDropdownMenuWrapper :size="size" :indicator-position="indicatorPosition">
        <template #trigger>
          <SButton variant="outline">Open Menu</SButton>
        </template>
        <SMenuOptions :items="items" class="w-72" @select="handleSelect" />
      </SDropdownMenuWrapper>
    </div>
  </div>
</template>
