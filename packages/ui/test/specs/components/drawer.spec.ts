import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SDrawer from '@/components/drawer/drawer.vue';

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

describe('SDrawer', () => {
  const slots = {
    trigger: '<button type="button">Open Drawer</button>',
    default: '<div data-content>Drawer content</div>'
  };

  describe('rendering', () => {
    it('renders drawer content when open', async () => {
      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          title: 'Drawer Title',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.text()).toContain('Drawer Title');
      expect(wrapper.text()).toContain('Drawer content');

      wrapper.unmount();
    });

    it('renders the trigger slot', () => {
      const wrapper = mount(SDrawer, {
        props: { title: 'Drawer' },
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.text()).toContain('Open Drawer');

      wrapper.unmount();
    });

    it('renders a handle by default', async () => {
      const wrapper = mount(SDrawer, {
        props: { open: true, title: 'Drawer', portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-handle]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('exposes drawer data attributes on chrome slots', async () => {
      const wrapper = mount(SDrawer, {
        props: { open: true, title: 'Drawer Title', portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-drawer-trigger]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-drawer-header]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-drawer-title]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-drawer-content]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-drawer-close]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies custom class to popup', async () => {
      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          class: 'my-drawer',
          portalProps: { disabled: true },
          title: 'Drawer'
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('.my-drawer').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('moves focus into the dialog when opened from the trigger', async () => {
      const wrapper = mount(SDrawer, {
        props: {
          title: 'Bottom Drawer Title'
        },
        slots: {
          trigger: '<button type="button">Open</button>',
          default: '<div>Drawer Content</div>'
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
      const wrapper = mount(SDrawer, {
        props: {
          title: 'Bottom Drawer Title'
        },
        slots: {
          trigger: '<button type="button">Open</button>',
          default: '<div>Drawer Content</div>'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await nextTick();
      await nextTick();

      const popup = document.body.querySelector('[data-soybean-drawer-popup]') as HTMLElement | null;

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

  describe('accessibility', () => {
    it('renders with dialog role when open', async () => {
      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          title: 'Accessible Drawer',
          description: 'A description for screen readers',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[role="dialog"]').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('snap points', () => {
    it('exposes snap-point state on the popup', async () => {
      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          title: 'Drawer',
          snapPoints: [0.5, 1],
          snapPoint: 0.5,
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      const popup = wrapper.find('[data-soybean-drawer-popup]');

      expect(popup.exists()).toBe(true);
      expect(popup.attributes('data-soybean-snap-points')).toBe('true');
      expect(popup.attributes('style')).toContain('--snap-point-height');

      wrapper.unmount();
    });

    it('reports no snap points when snapPoints are omitted', async () => {
      const wrapper = mount(SDrawer, {
        props: { open: true, title: 'Drawer', portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-drawer-popup]').attributes('data-soybean-snap-points')).toBe('false');

      wrapper.unmount();
    });
  });

  describe('scale background', () => {
    it('scales the marked wrapper while the drawer is open', async () => {
      const scaleTarget = document.createElement('div');

      scaleTarget.setAttribute('data-soybean-drawer-scale', '');
      document.body.appendChild(scaleTarget);

      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          title: 'Drawer',
          shouldScaleBackground: true,
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();
      await nextTick();

      expect(scaleTarget.style.transform).toContain('scale');
      expect(scaleTarget.style.borderRadius).not.toBe('');

      wrapper.unmount();
      scaleTarget.remove();
    });

    it('leaves the background untouched when scale background is off', async () => {
      const scaleTarget = document.createElement('div');

      scaleTarget.setAttribute('data-soybean-drawer-scale', '');
      document.body.appendChild(scaleTarget);

      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          title: 'Drawer',
          shouldScaleBackground: false,
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();
      await nextTick();

      expect(scaleTarget.style.transform).toBe('');

      wrapper.unmount();
      scaleTarget.remove();
    });
  });

  describe('modality tiers', () => {
    async function mountWithModality(modal: boolean | 'trap-focus') {
      const wrapper = mount(SDrawer, {
        props: { open: true, modal, title: 'Drawer', portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await nextTick();

      return wrapper;
    }

    async function readPopupModality(modal: boolean | 'trap-focus') {
      const wrapper = await mountWithModality(modal);
      const popup = wrapper.findComponent({ name: 'DialogPopupImpl' });

      expect(popup.exists()).toBe(true);

      const result = {
        trapFocus: popup.props('trapFocus'),
        disableOutsidePointerEvents: popup.props('disableOutsidePointerEvents')
      };

      wrapper.unmount();

      return result;
    }

    it('locks both focus and outside pointer events in the full-modal tier', async () => {
      expect(await readPopupModality(true)).toEqual({
        trapFocus: true,
        disableOutsidePointerEvents: true
      });
    });

    it('traps focus but keeps outside pointer events in the trap-focus tier', async () => {
      expect(await readPopupModality('trap-focus')).toEqual({
        trapFocus: true,
        disableOutsidePointerEvents: false
      });
    });

    it('disables both in the non-modal tier', async () => {
      expect(await readPopupModality(false)).toEqual({
        trapFocus: false,
        disableOutsidePointerEvents: false
      });
    });
  });
});
