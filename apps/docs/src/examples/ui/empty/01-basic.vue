<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButton, SButtonIcon, SEmpty, SInput, SSelect } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  title: string;
  description: string;
  icon: string;
  size: ThemeSize;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  title: 'No projects yet',
  description: 'Create your first project to start organizing work.',
  icon: 'lucide:folder-open',
  size: 'md'
};

const title = shallowRef(DEFAULTS.title);
const description = shallowRef(DEFAULTS.description);
const icon = shallowRef(DEFAULTS.icon);
const size = shallowRef(DEFAULTS.size);

const reset = (): void => {
  title.value = DEFAULTS.title;
  description.value = DEFAULTS.description;
  icon.value = DEFAULTS.icon;
  size.value = DEFAULTS.size;
};
</script>

<template>
  <div>
    <!-- 控制区：灰底卡片上排属性表单，改动即时反映到下面的预览；容器变窄时自动降列，控件不会被压到溢出 -->
    <!-- defer 不能省：宿主区域和示例在同一棵子树里挂载，同步解析时它还没被插进文档 -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="title">
          <SInput v-model="title" aria-label="Title" placeholder="Empty title" class="w-40" />
        </FieldItem>
        <FieldItem label="description">
          <SInput v-model="description" aria-label="Description" placeholder="Empty description" class="w-55" />
        </FieldItem>
        <FieldItem label="icon">
          <SInput v-model="icon" aria-label="Icon" placeholder="lucide:inbox" class="w-40" />
        </FieldItem>
        <FieldItem label="size">
          <SSelect v-model="size" :items="themeSizeOptions" :trigger-props="{ 'aria-label': 'Size' }" class="w-25" />
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身，保留默认插槽的行动按钮 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <SEmpty class="min-h-72" :title="title" :description="description" :icon="icon" :size="size">
        <SButton>Create project</SButton>
      </SEmpty>
    </div>
  </div>
</template>
