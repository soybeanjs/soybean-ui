<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAspectRatio, SButtonIcon, SSelect } from '@soybeanjs/ui';
import type { SelectOptionData } from '@soybeanjs/ui';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  ratio: number;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  ratio: 16 / 9
};

const ratioItems: SelectOptionData<number>[] = [
  { label: '16 / 9', value: 16 / 9 },
  { label: '4 / 3', value: 4 / 3 },
  { label: '1 / 1', value: 1 },
  { label: '3 / 4', value: 3 / 4 },
  { label: '9 / 16', value: 9 / 16 }
];

const ratio = shallowRef(DEFAULTS.ratio);

const reset = (): void => {
  ratio.value = DEFAULTS.ratio;
};
</script>

<template>
  <div>
    <!-- 控制区：灰底卡片上排属性表单，改动即时反映到下面的预览；容器变窄时自动降列，控件不会被压到溢出 -->
    <!-- defer 不能省：宿主区域和示例在同一棵子树里挂载，同步解析时它还没被插进文档 -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="ratio">
          <SSelect v-model="ratio" :items="ratioItems" :trigger-props="{ 'aria-label': 'Ratio' }" class="w-30" />
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <div class="w-100 bg-muted lt-md:w-full">
        <SAspectRatio :ratio="ratio">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            class="h-full w-full rounded-md object-cover m-0"
          />
        </SAspectRatio>
      </div>
    </div>
  </div>
</template>
