// @unocss-include
import { cv } from '@soybeanjs/cva';

export const ellipsisVariants = cv({
  base: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] data-[expanded]:[display:block]',
  variants: {
    lines: {
      '1': '[-webkit-line-clamp:1]',
      '2': '[-webkit-line-clamp:2]',
      '3': '[-webkit-line-clamp:3]',
      '4': '[-webkit-line-clamp:4]',
      '5': '[-webkit-line-clamp:5]',
      '6': '[-webkit-line-clamp:6]'
    }
  },
  defaultVariants: {
    lines: 1
  }
});
