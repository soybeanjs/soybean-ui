import type { MaybePromise } from '../../types';

export async function canClosePopconfirm(beforeClose?: () => MaybePromise<boolean | void>) {
  return (await beforeClose?.()) !== false;
}
