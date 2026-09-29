<script setup lang="ts">
import { shallowRef } from 'vue';
import { SSkeleton, SSelect, SSwitch } from '@soybeanjs/ui';
import type { SelectOptionData, SkeletonShape, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  size: ThemeSize;
  shape: SkeletonShape;
  animated: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  shape: 'auto',
  animated: true
};

/** 选项表只有「值即文案」一种形态，用一个纯函数生成，避免四份复制粘贴。 */
const toOptions = <T extends string>(values: readonly T[]): { value: T; label: T }[] =>
  values.map(value => ({ value, label: value }));

const SHAPE_KEYS: readonly SkeletonShape[] = ['auto', 'rounded'];

const shapeItems: SelectOptionData<SkeletonShape>[] = toOptions(SHAPE_KEYS);

const size = shallowRef(DEFAULTS.size);
const shape = shallowRef(DEFAULTS.shape);
const animated = shallowRef(DEFAULTS.animated);

const reset = (): void => {
  size.value = DEFAULTS.size;
  shape.value = DEFAULTS.shape;
  animated.value = DEFAULTS.animated;
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
        <FieldItem label="shape">
          <SSelect v-model="shape" :items="shapeItems" :trigger-props="{ 'aria-label': 'Shape' }" class="w-30" />
        </FieldItem>
        <FieldItem label="animated">
          <div class="h-8 flex items-center">
            <SSwitch v-model="animated" :control-props="{ 'aria-label': 'Animated' }" />
          </div>
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身；固定宽度让 `size` 只改高度、`shape` 的圆角差异可见 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <SSkeleton :size="size" :shape="shape" :animated="animated" class="w-64 max-w-full" />
    </div>
  </div>
</template>
