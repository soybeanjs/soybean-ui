<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButton, SButtonIcon, SInput, SInputNumber, SSelect, SSwitch, STooltip } from '@soybeanjs/ui';
import type { Placement, SelectOptionData, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  placement: Placement;
  showArrow: boolean;
  size: ThemeSize;
  delayDuration: number;
  disabled: boolean;
  content: string;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  placement: 'top',
  showArrow: false,
  size: 'md',
  delayDuration: 150,
  disabled: false,
  content: 'Tooltip content'
};

/** 选项表只有「值即文案」一种形态，用一个纯函数生成，避免四份复制粘贴。 */
const toOptions = <T extends string>(values: readonly T[]): { value: T; label: T }[] =>
  values.map(value => ({ value, label: value }));

const PLACEMENT_KEYS: readonly Placement[] = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end'
];

const placementItems: SelectOptionData<Placement>[] = toOptions(PLACEMENT_KEYS);

const placement = shallowRef(DEFAULTS.placement);
const showArrow = shallowRef(DEFAULTS.showArrow);
const size = shallowRef(DEFAULTS.size);
/** 数值控件允许空输入：`SInputNumber` 的模型是 `number | null`，空值回落到默认快照。 */
const delayDuration = shallowRef<number | null>(DEFAULTS.delayDuration);
const disabled = shallowRef(DEFAULTS.disabled);
const content = shallowRef(DEFAULTS.content);

const reset = (): void => {
  placement.value = DEFAULTS.placement;
  showArrow.value = DEFAULTS.showArrow;
  size.value = DEFAULTS.size;
  delayDuration.value = DEFAULTS.delayDuration;
  disabled.value = DEFAULTS.disabled;
  content.value = DEFAULTS.content;
};
</script>

<template>
  <div>
    <!-- 控制区：灰底卡片上排属性表单，改动即时反映到下面的预览；容器变窄时自动降列，控件不会被压到溢出 -->
    <!-- defer 不能省：宿主区域和示例在同一棵子树里挂载，同步解析时它还没被插进文档 -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="placement">
          <SSelect
            v-model="placement"
            :items="placementItems"
            :trigger-props="{ 'aria-label': 'Placement' }"
            class="w-35"
          />
        </FieldItem>
        <FieldItem label="size">
          <SSelect v-model="size" :items="themeSizeOptions" :trigger-props="{ 'aria-label': 'Size' }" class="w-25" />
        </FieldItem>
        <FieldItem label="delayDuration">
          <SInputNumber
            v-model="delayDuration"
            :min="0"
            :step="50"
            :control-props="{ 'aria-label': 'Delay duration' }"
            class="w-30"
          />
        </FieldItem>
        <FieldItem label="showArrow">
          <div class="h-8 flex items-center">
            <SSwitch v-model="showArrow" :control-props="{ 'aria-label': 'Show arrow' }" />
          </div>
        </FieldItem>
        <FieldItem label="disabled">
          <div class="h-8 flex items-center">
            <SSwitch v-model="disabled" :control-props="{ 'aria-label': 'Disabled' }" />
          </div>
        </FieldItem>
        <FieldItem label="content">
          <SInput v-model="content" aria-label="Content" />
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <STooltip
        :content="content"
        :placement="placement"
        :show-arrow="showArrow"
        :size="size"
        :delay-duration="delayDuration ?? DEFAULTS.delayDuration"
        :disabled="disabled"
      >
        <template #trigger>
          <SButton variant="pure">Hover me</SButton>
        </template>
      </STooltip>
    </div>
  </div>
</template>
