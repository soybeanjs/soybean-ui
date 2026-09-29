<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButtonIcon, SCard, SInput, SSwitch } from '@soybeanjs/ui';
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
  title: string;
  description: string;
  split: boolean;
  scrollable: boolean;
  open: boolean;
  disabled: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  title: 'Title',
  description: 'Card description',
  split: false,
  scrollable: false,
  open: true,
  disabled: false
};

const size = shallowRef(DEFAULTS.size);
const title = shallowRef(DEFAULTS.title);
const description = shallowRef(DEFAULTS.description);
const split = shallowRef(DEFAULTS.split);
const scrollable = shallowRef(DEFAULTS.scrollable);
const open = shallowRef(DEFAULTS.open);
const disabled = shallowRef(DEFAULTS.disabled);

const reset = (): void => {
  size.value = DEFAULTS.size;
  title.value = DEFAULTS.title;
  description.value = DEFAULTS.description;
  split.value = DEFAULTS.split;
  scrollable.value = DEFAULTS.scrollable;
  open.value = DEFAULTS.open;
  disabled.value = DEFAULTS.disabled;
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
        <FieldItem label="title">
          <SInput v-model="title" aria-label="Title" placeholder="Card title" />
        </FieldItem>
        <FieldItem label="description">
          <SInput v-model="description" aria-label="Description" placeholder="Card description" />
        </FieldItem>
        <FieldItem label="split">
          <div class="h-8 flex items-center">
            <SSwitch v-model="split" :control-props="{ 'aria-label': 'Split' }" />
          </div>
        </FieldItem>
        <FieldItem label="scrollable">
          <div class="h-8 flex items-center">
            <SSwitch v-model="scrollable" :control-props="{ 'aria-label': 'Scrollable' }" />
          </div>
        </FieldItem>
        <FieldItem label="open">
          <div class="h-8 flex items-center">
            <SSwitch v-model="open" :control-props="{ 'aria-label': 'Open' }" />
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
      <SCard
        v-model:open="open"
        :title="title"
        :description="description"
        :size="size"
        :split="split"
        :scrollable="scrollable"
        :disabled="disabled"
        class="w-100 max-w-full"
      >
        <template #extra>
          <div>extra slot</div>
        </template>
        <div class="text-gray-500 dark:text-neutral-400">Card content</div>
        <template #footer>
          <div>Footer slot</div>
        </template>
      </SCard>
    </div>
  </div>
</template>
