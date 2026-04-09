import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import SBottomSheet from '../../../src/components/bottom-sheet/bottom-sheet.vue';
import { getA11yViolations } from '../../shared/a11y';

function dispatchPointerEvent(target: EventTarget, type: string, init: PointerEventInit) {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, ...init }));
}

function mockRect(element: Element, height: number) {
  Object.defineProperty(element, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 320,
      bottom: height,
      width: 320,
      height,
      toJSON: () => ({})
    })
  });
}

function mockPointerCapture(element: Element) {
  Object.defineProperty(element, 'setPointerCapture', {
    configurable: true,
    value: () => undefined
  });

  Object.defineProperty(element, 'releasePointerCapture', {
    configurable: true,
    value: () => undefined
  });
}

describe('SBottomSheet', () => {
  describe('rendering', () => {
    it('renders default slot content when open', async () => {
      const wrapper = mount(SBottomSheet, {
        props: { defaultOpen: true, title: 'Share post' },
        slots: { default: 'Bottom sheet content' },
        attachTo: document.body
      });

      await nextTick();

      expect(document.body.textContent).toContain('Bottom sheet content');
      expect(document.body.querySelector('[data-bottom-sheet-handle]')).not.toBeNull();
      wrapper.unmount();
    });

    it('applies custom class to the content element', async () => {
      const wrapper = mount(SBottomSheet, {
        props: { defaultOpen: true, title: 'Share post', class: 'my-bottom-sheet' },
        slots: { default: 'Bottom sheet content' },
        attachTo: document.body
      });

      await nextTick();

      const dialog = document.body.querySelector('[role="dialog"]');

      expect(dialog?.classList.contains('my-bottom-sheet')).toBe(true);
      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('emits update:open when the trigger is clicked', async () => {
      const wrapper = mount(SBottomSheet, {
        props: { title: 'Share post' },
        slots: {
          trigger: '<button type="button">Open</button>',
          default: 'Bottom sheet content'
        },
        attachTo: document.body
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('update:open')?.[0]).toEqual([true]);
      wrapper.unmount();
    });

    it('emits update:open when dragged below the close threshold', async () => {
      const wrapper = mount(SBottomSheet, {
        props: { defaultOpen: true, title: 'Share post' },
        slots: { default: 'Bottom sheet content' },
        attachTo: document.body
      });

      await nextTick();

      const dialog = document.body.querySelector('[role="dialog"]');
      const handle = document.body.querySelector('[data-bottom-sheet-handle]');

      expect(dialog).not.toBeNull();
      expect(handle).not.toBeNull();

      mockRect(dialog as Element, 400);
      mockPointerCapture(dialog as Element);

      dispatchPointerEvent(handle as Element, 'pointerdown', {
        pointerId: 1,
        button: 0,
        clientY: 0
      });
      dispatchPointerEvent(document, 'pointermove', { pointerId: 1, clientY: 180 });
      dispatchPointerEvent(document, 'pointerup', { pointerId: 1, clientY: 180 });

      await nextTick();

      const emitted = wrapper.emitted('update:open');

      expect(emitted?.at(-1)).toEqual([false]);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when open', async () => {
      const wrapper = mount(SBottomSheet, {
        props: {
          defaultOpen: true,
          title: 'Share post',
          description: 'Invite teammates or copy the link to continue.'
        },
        slots: { default: 'Bottom sheet content' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(document.body);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
