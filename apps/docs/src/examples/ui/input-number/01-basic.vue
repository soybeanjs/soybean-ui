<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButtonIcon, SInput, SInputNumber, SSelect, SSwitch } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  size: ThemeSize;
  center: boolean;
  clearable: boolean;
  disabled: boolean;
  step: number;
  placeholder: string;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  center: false,
  clearable: false,
  disabled: false,
  step: 1,
  placeholder: 'Please input'
};

const size = shallowRef(DEFAULTS.size);
const center = shallowRef(DEFAULTS.center);
const clearable = shallowRef(DEFAULTS.clearable);
const disabled = shallowRef(DEFAULTS.disabled);
const step = shallowRef(DEFAULTS.step);
const placeholder = shallowRef(DEFAULTS.placeholder);
const modelValue = shallowRef<number | null>(null);

const reset = (): void => {
  size.value = DEFAULTS.size;
  center.value = DEFAULTS.center;
  clearable.value = DEFAULTS.clearable;
  disabled.value = DEFAULTS.disabled;
  step.value = DEFAULTS.step;
  placeholder.value = DEFAULTS.placeholder;
  modelValue.value = null;
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
        <FieldItem label="step">
          <SInputNumber v-model="step" :min="1" :step="1" :control-props="{ 'aria-label': 'Step' }" class="w-25" />
        </FieldItem>
        <FieldItem label="placeholder">
          <SInput v-model="placeholder" aria-label="Placeholder" placeholder="Input placeholder" />
        </FieldItem>
        <FieldItem label="center">
          <div class="h-8 flex items-center">
            <SSwitch v-model="center" :control-props="{ 'aria-label': 'Center' }" />
          </div>
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
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <div class="w-60 lt-md:w-auto">
        <SInputNumber
          v-model="modelValue"
          :size="size"
          :center="center"
          :clearable="clearable"
          :disabled="disabled"
          :step="step"
          :placeholder="placeholder"
        />
      </div>
    </div>
  </div>
</template>
