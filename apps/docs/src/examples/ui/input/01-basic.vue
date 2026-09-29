<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButtonIcon, SInput, SSelect, SSwitch } from '@soybeanjs/ui';
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
  clearable: boolean;
  disabled: boolean;
  readonly: boolean;
  placeholder: string;
  text: string;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  clearable: false,
  disabled: false,
  readonly: false,
  placeholder: 'Please input',
  text: ''
};

const size = shallowRef(DEFAULTS.size);
const clearable = shallowRef(DEFAULTS.clearable);
const disabled = shallowRef(DEFAULTS.disabled);
const readonly = shallowRef(DEFAULTS.readonly);
const placeholder = shallowRef(DEFAULTS.placeholder);
const modelValue = shallowRef(DEFAULTS.text);

const reset = (): void => {
  size.value = DEFAULTS.size;
  clearable.value = DEFAULTS.clearable;
  disabled.value = DEFAULTS.disabled;
  readonly.value = DEFAULTS.readonly;
  placeholder.value = DEFAULTS.placeholder;
  modelValue.value = DEFAULTS.text;
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
        <FieldItem label="placeholder">
          <SInput v-model="placeholder" aria-label="Placeholder" placeholder="Input placeholder" />
        </FieldItem>
        <FieldItem label="clearable">
          <div class="h-8 flex items-center">
            <SSwitch v-model="clearable" :control-props="{ 'aria-label': 'Clearable' }" />
          </div>
        </FieldItem>
        <FieldItem label="readonly">
          <div class="h-8 flex items-center">
            <SSwitch v-model="readonly" :control-props="{ 'aria-label': 'Readonly' }" />
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
    <div class="relative flex min-h-56 flex-col items-center justify-center gap-3">
      <div class="leading-loose text-sm text-gray-500">modelValue: {{ modelValue }}</div>
      <div class="w-60 lt-md:w-auto">
        <SInput
          v-model="modelValue"
          :size="size"
          :clearable="clearable"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
        />
      </div>
    </div>
  </div>
</template>
