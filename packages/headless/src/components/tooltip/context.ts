import { providePopperV2Ui } from '../popper-v2/context';
import { useContext, useUiContext } from '../../composables';
import type { PopperV2UiSlot } from '../popper-v2/types';
import type { TooltipProviderContext, TooltipRootContextParams } from './types';

export const [provideTooltipProviderContext, useTooltipProviderContext] = useContext(
  'TooltipProvider',
  (params: TooltipProviderContext) => params
);

export const [provideTooltipRootContext, useTooltipRootContext] = useContext(
  'TooltipRoot',
  (params: TooltipRootContextParams) => params
);

export const [provideTooltipUi, useTooltipUi] = useUiContext<PopperV2UiSlot>('Tooltip', ui => {
  providePopperV2Ui(ui);

  return ui;
});
