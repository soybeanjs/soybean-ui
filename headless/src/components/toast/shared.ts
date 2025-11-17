import { isHTMLElement } from '../../shared';

export const toastCssVars = {
  swipeMoveX: '--soybean-toast-swipe-move-x',
  swipeMoveY: '--soybean-toast-swipe-move-y',
  swipeEndX: '--soybean-toast-swipe-end-x',
  swipeEndY: '--soybean-toast-swipe-end-y'
};

export const TOAST_DATA_SWIPE = 'data-swipe';

export const toastSwipe = {
  start: 'start',
  move: 'move',
  cancel: 'cancel',
  end: 'end'
} as const;

export const TOAST_SWIPE_START = 'toast.swipeStart';
export const TOAST_SWIPE_MOVE = 'toast.swipeMove';
export const TOAST_SWIPE_CANCEL = 'toast.swipeCancel';
export const TOAST_SWIPE_END = 'toast.swipeEnd';

export const VIEWPORT_NAME = 'ToastViewport';
export const VIEWPORT_DEFAULT_HOTKEY = ['F8'];
export const VIEWPORT_PAUSE = 'toast.viewportPause';
export const VIEWPORT_RESUME = 'toast.viewportResume';

export function getAnnounceTextContent(container: HTMLElement) {
  const textContent: string[] = [];
  const childNodes = Array.from(container.childNodes);

  childNodes.forEach(node => {
    if (node.nodeType === node.TEXT_NODE && node.textContent) {
      textContent.push(node.textContent);
    }

    if (!isHTMLElement(node)) return;
    const isHidden = node.ariaHidden || node.hidden || node.style.display === 'none';
    const isExcluded = node.dataset.soybeanToastAnnounceExclude === '';

    if (isHidden) return;

    if (isExcluded) {
      const altText = node.dataset.soybeanToastAnnounceAlt;
      if (altText) {
        textContent.push(altText);
      }
    } else {
      textContent.push(...getAnnounceTextContent(node));
    }
  });
  // We return a collection of text rather than a single concatenated string.
  // This allows SR VO to naturally pause break between nodes while announcing.
  return textContent;
}
