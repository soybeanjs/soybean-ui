import { onMounted, onUnmounted } from 'vue';

/** Number of components which have requested interest to have focus guards */
let count = 0;

const FOCUS_GUARD_ATTRIBUTE = 'data-soybean-focus-guard';

export function useFocusGuards() {
  onMounted(() => {
    const edgeGuards = document.querySelectorAll(`[${FOCUS_GUARD_ATTRIBUTE}]`);
    document.body.insertAdjacentElement('afterbegin', edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement('beforeend', edgeGuards[1] ?? createFocusGuard());
    count++;
  });

  onUnmounted(() => {
    if (count === 1) {
      document.querySelectorAll(`[${FOCUS_GUARD_ATTRIBUTE}]`).forEach(node => node.remove());
    }
    count--;
  });
}

function createFocusGuard() {
  const element = document.createElement('span');
  element.setAttribute(FOCUS_GUARD_ATTRIBUTE, '');
  element.tabIndex = 0;
  Object.assign(element.style, {
    outline: 'none',
    opacity: '0',
    position: 'fixed',
    pointerEvents: 'none'
  });
  return element;
}
