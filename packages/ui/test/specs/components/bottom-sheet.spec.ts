import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SBottomSheet from '@/components/bottom-sheet/bottom-sheet.vue';

function mockRect(element: Element, rect: { x?: number; y?: number; width?: number; height?: number }) {
  Object.defineProperty(element, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      x: rect.x ?? 0,
      y: rect.y ?? 0,
      top: rect.y ?? 0,
      left: rect.x ?? 0,
      right: (rect.x ?? 0) + (rect.width ?? 0),
      bottom: (rect.y ?? 0) + (rect.height ?? 0),
      width: rect.width ?? 0,
      height: rect.height ?? 0,
      toJSON: () => ({})
    })
  });
}

function mockPointerCapture(element: Element) {
  let capturedPointerId: number | null = null;

  Object.defineProperty(element, 'setPointerCapture', {
    configurable: true,
    value: (pointerId: number) => {
      capturedPointerId = pointerId;
    }
  });

  Object.defineProperty(element, 'hasPointerCapture', {
    configurable: true,
    value: (pointerId: number) => capturedPointerId === pointerId
  });

  Object.defineProperty(element, 'releasePointerCapture', {
    configurable: true,
    value: (pointerId: number) => {
      if (capturedPointerId === pointerId) {
        capturedPointerId = null;
      }
    }
  });
}

function dispatchPointerEvent(target: EventTarget, type: string, init: PointerEventInit) {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, ...init }));
}

describe('SBottomSheet', () => {
  describe('state', () => {
    it('moves focus into the dialog when opened from the trigger', async () => {
      const wrapper = mount(SBottomSheet, {
        props: {
          title: 'Bottom Sheet Title'
        },
        slots: {
          trigger: '<button type="button">Open</button>',
          default: '<div>Bottom Sheet Content</div>'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await nextTick();
      await nextTick();

      const popup = document.body.querySelector('[role="dialog"]');

      expect(popup).toBeTruthy();
      expect(document.activeElement).toBe(popup);
      expect(document.activeElement?.closest('[aria-hidden="true"]')).toBeNull();

      wrapper.unmount();
    });

    it('does not enter snap-point release logic when snapPoints are omitted', async () => {
      const wrapper = mount(SBottomSheet, {
        props: {
          title: 'Bottom Sheet Title'
        },
        slots: {
          trigger: '<button type="button">Open</button>',
          default: '<div>Bottom Sheet Content</div>'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await nextTick();
      await nextTick();

      const popup = document.body.querySelector('[data-soybean-bottom-sheet-popup]') as HTMLElement | null;

      expect(popup).toBeTruthy();

      if (!popup) {
        wrapper.unmount();
        return;
      }

      mockPointerCapture(popup);
      mockRect(popup, { width: 320, height: 300 });

      dispatchPointerEvent(popup, 'pointerdown', { clientY: 100, pointerId: 1 });
      dispatchPointerEvent(popup, 'pointermove', { clientY: 220, pointerId: 1 });
      popup.style.transform = 'matrix(1, 0, 0, 1, 0, 120)';

      expect(() => {
        dispatchPointerEvent(popup, 'pointerup', { clientY: 220, pointerId: 1 });
      }).not.toThrow();

      await nextTick();
      await nextTick();

      wrapper.unmount();
    });
  });
});
