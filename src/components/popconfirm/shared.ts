import { miniSizeMap } from '@/theme';
import type { ThemeSize } from '@/theme';
import type { ButtonProps } from '../button/types';
import { buttonVariants } from '../button/variants';

type PopconfirmButtonStyleProps = Pick<ButtonProps, 'color' | 'fitContent' | 'shape' | 'shadow' | 'size' | 'variant'>;

export function resolvePopconfirmButtonVariants(
  props?: Partial<PopconfirmButtonStyleProps>,
  size?: ThemeSize,
  defaults: Partial<PopconfirmButtonStyleProps> = {}
) {
  return buttonVariants({
    ...defaults,
    color: props?.color,
    fitContent: props?.fitContent,
    shape: props?.shape,
    shadow: props?.shadow,
    size: props?.size ?? defaults.size ?? miniSizeMap[size ?? 'md'],
    variant: props?.variant
  });
}

export function omitPopconfirmButtonStyleProps<T extends ButtonProps>(props?: T) {
  if (!props) {
    return undefined;
  }

  const {
    color: _color,
    fitContent: _fitContent,
    shape: _shape,
    shadow: _shadow,
    size: _size,
    variant: _variant,
    ...rest
  } = props;

  return rest;
}
