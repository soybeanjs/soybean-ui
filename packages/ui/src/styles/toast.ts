// @unocss-include
import { scv } from '@soybeanjs/cva';
import { miniButtonVariants, miniButtonIconVariants } from './button';

export const toastVariants = scv({
  extendBase: props => ({
    close: miniButtonIconVariants({ size: props.size }),
    cancel: miniButtonVariants({ size: props.size, variant: 'pure' }),
    action: miniButtonVariants({ size: props.size })
  }),
  slots: {
    toaster: [
      'fixed z-[--z-index] list-none outline-none transition-transform-400 ease',
      'data-[x-position=right]:end-[--offset-right] data-[x-position=left]:start-[--offset-left] data-[x-position=center]:start-1/2 data-[x-position=center]:-translate-x-1/2 [&[dir=rtl]]:data-[x-position=center]:translate-x-1/2',
      'data-[y-position=top]:top-[--offset-top] data-[y-position=bottom]:bottom-[--offset-bottom]',
      'max-[600px]:w-full max-[600px]:data-[x-position=right]:start-[--mobile-offset-left] max-[600px]:data-[x-position=left]:end-[--mobile-offset-right] max-[600px]:data-[x-position=center]:start-[--mobile-offset-left] max-[600px]:data-[x-position=center]:end-[--mobile-offset-right] max-[600px]:data-[x-position=center]:[transform:none]',
      'max-[600px]:data-[y-position=top]:top-[--mobile-offset-top] max-[600px]:data-[y-position=bottom]:bottom-[--mobile-offset-bottom]'
    ],
    toast: [
      'group absolute w-full rounded-md bg-popover text-popover-foreground border border-transparent opacity-0 outline-none touch-none',
      'z-[--z-index] break-anywhere [--y:translateY(100%)] [--lift:1] [--lift-amount:calc(var(--lift)*var(--gap))] [transform:var(--y)]',
      '[transition:transform_400ms,opacity_400ms,height_400ms,box-shadow_200ms] [box-shadow:0_4px_12px_hsl(var(--foreground)/0.1)]',
      'focus-visible:[box-shadow:0_4px_12px_hsl(var(--foreground)/0.1),0_0_0_2px_hsl(var(--foreground)/0.2)] [&>*]:[transition:opacity_400ms]',
      'data-[y-position=top]:top-0 data-[y-position=top]:[--y:translateY(-100%)] data-[mounted=true]:[--y:translateY(0)]',
      'data-[y-position=bottom]:[--lift:-1] data-[y-position=bottom]:bottom-0',
      'data-[x-position=left]:start-0 data-[x-position=right]:end-0',
      'data-[swiping=true]:transition-none data-[swiping=true]:[transform:var(--y)_translateY(var(--swipe-amount-y,0px))_translateX(var(--swipe-amount-x,0px))]',
      'data-[swiping=true]:before:content-empty data-[swiping=true]:before:absolute data-[swiping=true]:before:[inset-inline:-100%] data-[swiping=true]:before:h-full data-[swiping=true]:before:-z-1',
      'data-[y-position=top]:data-[swiping=true]:before:bottom-1/2 data-[y-position=top]:data-[swiping=true]:before:[transform:scaleY(3)_translateY(50%)]',
      'data-[y-position=bottom]:data-[swiping=true]:before:top-1/2 data-[y-position=bottom]:data-[swiping=true]:before:[transform:scaleY(3)_translateY(-50%)]',
      'data-[swiping=false]:data-[removed=true]:before:content-empty data-[swiping=false]:data-[removed=true]:before:absolute data-[swiping=false]:data-[removed=true]:before:inset-0 data-[swiping=false]:data-[removed=true]:before:[transform:scaleY(2)]',
      'data-[expanded=true]:after:content-empty data-[expanded=true]:after:absolute data-[expanded=true]:after:start-0 data-[expanded=true]:after:bottom-full data-[expanded=true]:after:w-full data-[expanded=true]:after:h-[calc(var(--gap)_+_1px)]',
      'data-[mounted=true]:opacity-100 data-[visible=false]:pointer-events-none data-[visible=false]:data-[mounted=true]:opacity-0',
      'data-[expanded=false]:data-[front=false]:[--scale:var(--toasts-before)*0.05_+_1] data-[expanded=false]:data-[front=false]:[--y:translateY(calc(var(--lift-amount)*var(--toasts-before)))_scale(calc(-1*var(--scale)))] data-[expanded=false]:data-[front=false]:h-[var(--front-toast-height)] [&[data-expanded=false][data-front=false]>*]:opacity-0',
      'data-[mounted=true]:data-[expanded=true]:[--y:translateY(calc(var(--lift)*var(--offset)))] data-[mounted=true]:data-[expanded=true]:h-[var(--initial-height)]',
      'data-[removed=true]:data-[front=true]:data-[swipe-out=false]:[--y:translateY(calc(var(--lift)*-100%))] data-[removed=true]:data-[front=true]:data-[swipe-out=false]:opacity-0',
      'data-[removed=true]:data-[front=false]:data-[swipe-out=false]:data-[expanded=true]:[--y:translateY(calc(var(--lift)*var(--offset)_+_var(--lift)*-100%))] data-[removed=true]:data-[front=false]:data-[swipe-out=false]:data-[expanded=true]:opacity-0',
      'data-[removed=true]:data-[front=false]:data-[swipe-out=false]:data-[expanded=false]:[--y:translateY(40%)] data-[removed=true]:data-[front=false]:data-[swipe-out=false]:data-[expanded=false]:opacity-0 data-[removed=true]:data-[front=false]:data-[swipe-out=false]:data-[expanded=false]:[transition:transform_500ms,opacity_200ms]',
      'data-[removed=true]:data-[front=false]:before:h-[calc(var(--initial-height)_+_20%)]',
      'data-[swiped=true]:select-none',
      'data-[swipe-out=true]:data-[y-position=top]:[animation-duration:200ms] data-[swipe-out=true]:data-[y-position=bottom]:[animation-duration:200ms]',
      'data-[swipe-out=true]:data-[y-position=top]:[animation-timing-function:ease-out] data-[swipe-out=true]:data-[y-position=bottom]:[animation-timing-function:ease-out]',
      'data-[swipe-out=true]:data-[y-position=top]:[animation-fill-mode:forwards] data-[swipe-out=true]:data-[y-position=bottom]:[animation-fill-mode:forwards]',
      'data-[swipe-out=true]:data-[swipe-direction=left]:[animation-name:toast-swipe-out-left] data-[swipe-out=true]:data-[swipe-direction=right]:[animation-name:toast-swipe-out-right] data-[swipe-out=true]:data-[swipe-direction=up]:[animation-name:toast-swipe-out-up] data-[swipe-out=true]:data-[swipe-direction=down]:[animation-name:toast-swipe-out-down]',
      'data-[rich-color=true]:data-[type=success]:bg-success-100 data-[rich-color=true]:data-[type=success]:border-success',
      'data-[rich-color=true]:data-[type=info]:bg-info-100 data-[rich-color=true]:data-[type=info]:border-info',
      'data-[rich-color=true]:data-[type=warning]:bg-warning-100 data-[rich-color=true]:data-[type=warning]:border-warning',
      'data-[rich-color=true]:data-[type=error]:bg-destructive-100 data-[rich-color=true]:data-[type=error]:border-destructive',
      'data-[inverted=true]:bg-carbon data-[inverted=true]:border-carbon data-[inverted=true]:text-carbon-foreground'
    ],
    wrapper: 'flex flex-col items-stretch',
    content: '',
    title: 'flex items-center font-semibold',
    description: 'text-muted-foreground',
    icon: [
      'group-data-[type=info]:text-info group-data-[type=success]:text-success group-data-[type=warning]:text-warning group-data-[type=error]:text-destructive'
    ],
    footer: 'flex justify-end items-center',
    action: '',
    cancel: '',
    close: 'absolute group-data-[inverted=true]:text-accent group-data-[inverted=true]:hover:bg-accent/15'
  },
  variants: {
    size: {
      xs: {
        toaster: 'w-80 text-2xs',
        toast: 'p-3',
        wrapper: 'gap-1',
        title: 'gap-1.25',
        footer: 'gap-1.25',
        close: 'top-1 end-1'
      },
      sm: {
        toaster: 'w-85 text-xs',
        toast: 'p-3.5',
        wrapper: 'gap-1.25',
        title: 'gap-1.5',
        footer: 'gap-1.5',
        close: 'top-1.25 end-1.25'
      },
      md: {
        toaster: 'w-90 text-sm',
        toast: 'p-4',
        wrapper: 'gap-1.5',
        title: 'gap-2',
        footer: 'gap-2',
        close: 'top-1.5 end-1.5'
      },
      lg: {
        toaster: 'w-95 text-base',
        toast: 'p-4.5',
        wrapper: 'gap-1.75',
        title: 'gap-2.5',
        footer: 'gap-2.5',
        close: 'top-1.75 end-1.75'
      },
      xl: {
        toaster: 'w-100 text-lg',
        toast: 'p-5',
        wrapper: 'gap-2',
        title: 'gap-3',
        footer: 'gap-3',
        close: 'top-2 end-2'
      },
      '2xl': {
        toaster: 'w-110 text-xl',
        toast: 'p-6',
        wrapper: 'gap-2.5',
        title: 'gap-4',
        footer: 'gap-4',
        close: 'top-2.5 end-2.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
