<script setup lang="ts">
import { shallowRef } from 'vue';
import { createTime } from '@soybeanjs/headless/date';
import type { TimeGranularity } from '@soybeanjs/headless/date';
import { SButtonIcon, SInput, SSelect, SSwitch, STimeRangeField } from '@soybeanjs/ui';
import type { SelectOptionData, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  granularity: TimeGranularity;
  size: ThemeSize;
  separator: string;
  disabled: boolean;
  readonly: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  granularity: 'minute',
  size: 'md',
  separator: '–',
  disabled: false,
  readonly: false
};

/** 选项表只有「值即文案」一种形态，用一个纯函数生成，避免四份复制粘贴。 */
const toOptions = <T extends string>(values: readonly T[]): { value: T; label: T }[] =>
  values.map(value => ({ value, label: value }));

const GRANULARITY_KEYS: readonly TimeGranularity[] = ['hour', 'minute', 'second'];

const granularityItems: SelectOptionData<TimeGranularity>[] = toOptions(GRANULARITY_KEYS);

const granularity = shallowRef(DEFAULTS.granularity);
const size = shallowRef(DEFAULTS.size);
const separator = shallowRef(DEFAULTS.separator);
const disabled = shallowRef(DEFAULTS.disabled);
const readonly = shallowRef(DEFAULTS.readonly);

const value = shallowRef({
  start: createTime(9, 0, 0),
  end: createTime(17, 30, 0)
});

const reset = (): void => {
  granularity.value = DEFAULTS.granularity;
  size.value = DEFAULTS.size;
  separator.value = DEFAULTS.separator;
  disabled.value = DEFAULTS.disabled;
  readonly.value = DEFAULTS.readonly;
};
</script>

<template>
  <div>
    <!-- 控制区：灰底卡片上排属性表单，改动即时反映到下面的预览；容器变窄时自动降列，控件不会被压到溢出 -->
    <!-- defer 不能省：宿主区域和示例在同一棵子树里挂载，同步解析时它还没被插进文档 -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="granularity">
          <SSelect
            v-model="granularity"
            :items="granularityItems"
            :trigger-props="{ 'aria-label': 'Granularity' }"
            class="w-30"
          />
        </FieldItem>
        <FieldItem label="size">
          <SSelect v-model="size" :items="themeSizeOptions" :trigger-props="{ 'aria-label': 'Size' }" class="w-25" />
        </FieldItem>
        <FieldItem label="separator">
          <SInput v-model="separator" aria-label="Separator" />
        </FieldItem>
        <FieldItem label="disabled">
          <div class="h-8 flex items-center">
            <SSwitch v-model="disabled" :control-props="{ 'aria-label': 'Disabled' }" />
          </div>
        </FieldItem>
        <FieldItem label="readonly">
          <div class="h-8 flex items-center">
            <SSwitch v-model="readonly" :control-props="{ 'aria-label': 'Readonly' }" />
          </div>
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <STimeRangeField
        v-model="value"
        :granularity="granularity"
        :size="size"
        :separator="separator"
        :disabled="disabled"
        :readonly="readonly"
        aria-label="Working hours"
      />
    </div>
  </div>
</template>
