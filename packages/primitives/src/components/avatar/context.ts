import { useContext } from '../../composables';
import type { AvatarRootContext, AvatarRootContextParams } from './types';

export const [provideAvatarRootContext, injectAvatarRootContext] = useContext(
  'AvatarRoot',
  (params: AvatarRootContextParams) => {
    const context: AvatarRootContext = {
      ...params,
      updateImageLoadingStatus: status => {
        params.imageLoadingStatus.value = status;
      }
    };

    return context;
  }
);
