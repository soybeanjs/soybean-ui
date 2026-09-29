<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { SSelect, SSwitch } from '@soybeanjs/ui';
import type { SelectOptionData, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  size: ThemeSize;
  multiple: boolean;
  clearable: boolean;
  disabled: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  multiple: false,
  clearable: false,
  disabled: false
};

const size = shallowRef(DEFAULTS.size);
const multiple = shallowRef(DEFAULTS.multiple);
const clearable = shallowRef(DEFAULTS.clearable);
const disabled = shallowRef(DEFAULTS.disabled);

/** 单选值是字符串、多选值是数组：`undefined` 表示未选中，占位文案由此显示。 */
const value = shallowRef<string | string[] | undefined>(undefined);

/** `update:modelValue` 事件与选择模式无关，统一在这里落地，避免模板里出现镜像赋值。 */
const handleUpdate = (next: string | string[] | null): void => {
  value.value = next ?? undefined;
};

/** 切换选择模式时把值收敛到目标形态，避免单选态残留数组、多选态残留单值。 */
watch(multiple, isMultiple => {
  if (isMultiple) {
    value.value = Array.isArray(value.value) ? value.value : value.value ? [value.value] : [];
  } else {
    value.value = Array.isArray(value.value) ? value.value[0] : value.value;
  }
});

const fruits = ['apple', 'banana', 'cherry', 'orange', 'pear', 'plum', 'strawberry', 'watermelon'];

const items: SelectOptionData<string>[] = fruits.map(fruit => ({
  label: fruit,
  value: fruit
}));

const reset = (): void => {
  size.value = DEFAULTS.size;
  multiple.value = DEFAULTS.multiple;
  clearable.value = DEFAULTS.clearable;
  disabled.value = DEFAULTS.disabled;
  value.value = undefined;
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
        <FieldItem label="multiple">
          <div class="h-8 flex items-center">
            <SSwitch v-model="multiple" :control-props="{ 'aria-label': 'Multiple' }" />
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
      <SSelect
        :model-value="value"
        :items="items"
        :multiple="multiple"
        :clearable="clearable"
        :disabled="disabled"
        :size="size"
        placeholder="Please select a fruit"
        class="w-60 lt-md:w-auto"
        @update:model-value="handleUpdate"
      />
    </div>
  </div>
</template>
