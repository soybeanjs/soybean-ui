<script setup lang="ts">
import { shallowRef } from 'vue';
import { SBreadcrumb, SButtonIcon, SSelect, SSwitch } from '@soybeanjs/ui';
import type { BreadcrumbOptionData, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  size: ThemeSize;
  ellipsis: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  ellipsis: false
};

const size = shallowRef(DEFAULTS.size);
const ellipsis = shallowRef(DEFAULTS.ellipsis);

const items = [
  {
    label: 'Home',
    value: 'home',
    icon: 'lucide:home'
  },
  {
    label: 'Components',
    value: 'components',
    icon: 'lucide:component'
  },
  {
    label: 'Library',
    value: 'library',
    icon: 'lucide:library'
  },
  {
    label: 'Data',
    value: 'data',
    icon: 'lucide:database'
  },
  {
    label: 'Breadcrumb',
    value: 'breadcrumb',
    icon: 'lucide:folder'
  }
] satisfies BreadcrumbOptionData[];

function handleClick(item: BreadcrumbOptionData) {
  console.log('clicked:', item);
}

const reset = (): void => {
  size.value = DEFAULTS.size;
  ellipsis.value = DEFAULTS.ellipsis;
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
        <FieldItem label="ellipsis">
          <div class="h-8 flex items-center">
            <SSwitch v-model="ellipsis" :control-props="{ 'aria-label': 'Ellipsis' }" />
          </div>
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <SBreadcrumb :items="items" :size="size" :ellipsis="ellipsis ? true : undefined" @click="handleClick" />
    </div>
  </div>
</template>
