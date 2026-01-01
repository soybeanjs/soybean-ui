import { useContext } from '../../composables';
import type { TreeMenuItemContextParams, TreeMenuRootContextParams, TreeMenuThemeContextParams } from './types';

export const [provideTreeMenuRootContext, useTreeMenuRootContext] = useContext(
  'TreeMenuRoot',
  (params: TreeMenuRootContextParams) => {
    const { modelValue, expanded, collapsed } = params;

    const onModelValueChange = (value: string) => {
      modelValue.value = value;
    };

    const onExpandedChange = (value: string[]) => {
      expanded.value = value;
    };

    const onExpandedToggle = (value: string) => {
      if (expanded.value.includes(value)) {
        expanded.value = expanded.value.filter(v => v !== value);
      } else {
        expanded.value = [...expanded.value, value];
      }
    };

    const onCollapsedChange = (value: boolean) => {
      collapsed.value = value;
    };

    return {
      ...params,
      onModelValueChange,
      onExpandedChange,
      onExpandedToggle,
      onCollapsedChange
    };
  }
);

export const [provideTreeMenuItemContext, useTreeMenuItemContext] = useContext(
  'TreeMenuItem',
  (params: TreeMenuItemContextParams) => params
);

export const [provideTreeMenuThemeContext, useTreeMenuThemeContext] = useContext(
  'TreeMenuTheme',
  (params: TreeMenuThemeContextParams) => params
);
