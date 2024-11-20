import type { LabelProps as _LabelProps } from '@soybean-ui/primitive';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValueProp } from '../../types';

export type LabelProps = ClassValueProp &
  Pick<_LabelProps, 'for'> & {
    size?: ThemeSize;
  };
