// @unocss-include
import { scv } from '@soybeanjs/cva';
import { miniButtonIconVariants } from './button';
import { inputVariants } from './input';

export const passwordVariants = scv({
  extend: [inputVariants],
  extendBase: props => ({
    visible: miniButtonIconVariants({ size: props.size })
  })
});
