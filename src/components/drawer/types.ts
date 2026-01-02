import type { Side, UiClass } from '@soybeanjs/headless';
import type { DialogEmits, DialogExtendedUiSlot, DialogProps } from '../dialog/types';

export type DrawerExtraUiSlot = 'main';

export type DrawerExtendedUi = UiClass<DialogExtendedUiSlot | DrawerExtraUiSlot>;

export interface DrawerProps extends DialogProps {
  side?: Side;
  ui?: Partial<DrawerExtendedUi>;
}

export type DrawerEmits = DialogEmits;
