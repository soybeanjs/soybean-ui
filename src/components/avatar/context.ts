import { shallowRef } from 'vue';
import { useContext } from '../../composables';
import type { ImageLoadingStatus } from '../../types';

export const [provideAvatarRootContext, useAvatarRootContext] = useContext('AvatarRoot', () => {
  const imageLoadingStatus = shallowRef<ImageLoadingStatus>('idle');

  const updateImageLoadingStatus = (status: ImageLoadingStatus) => {
    imageLoadingStatus.value = status;
  };

  return {
    imageLoadingStatus,
    updateImageLoadingStatus
  };
});
