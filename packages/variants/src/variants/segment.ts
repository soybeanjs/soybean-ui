// @unocss-include
import { tv } from 'tailwind-variants';

export const segmentVariants = tv({
  slots: {
    triggerRoot: 'relative inline-flex justify-center items-center p-1 rounded-md bg-muted text-muted-foreground',
    trigger: [
      `relative z-2 inline-flex items-center justify-center flex-1 whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all`,
      `focus-visible:(outline-solid outline-2 outline-primary outline-offset-2)`,
      `disabled:(pointer-events-none opacity-50)`
    ],
    indicatorRoot: `absolute top-0 left-0 z-1 h-full w-[--soybean-tabs-indicator-size] py-1 translate-x-[--soybean-tabs-indicator-position] transition-[width,height,transform] duration-300`,
    indicator: `size-full rounded-md bg-background shadow`
  }
});

export type SegmentSlots = keyof typeof segmentVariants.slots;
