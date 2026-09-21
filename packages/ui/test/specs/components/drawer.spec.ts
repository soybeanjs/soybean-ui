import { describe, expect, it, vi } from 'vitest';
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

      expect(wrapper.find('[data-vean-handle]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('exposes drawer data attributes on chrome slots', async () => {
      const wrapper = mount(SDrawer, {
        props: { open: true, title: 'Drawer Title', portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-vean-drawer-trigger]').exists()).toBe(true);
      expect(wrapper.find('[data-vean-drawer-header]').exists()).toBe(true);
      expect(wrapper.find('[data-vean-drawer-title]').exists()).toBe(true);
      expect(wrapper.find('[data-vean-drawer-content]').exists()).toBe(true);
      expect(wrapper.find('[data-vean-drawer-close]').exists()).toBe(true);

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

      const popup = document.body.querySelector('[data-vean-drawer-popup]') as HTMLElement | null;

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

      const popup = wrapper.find('[data-vean-drawer-popup]');

      expect(popup.exists()).toBe(true);
      expect(popup.attributes('data-vean-snap-points')).toBe('true');
      expect(popup.attributes('data-vean-drawer-side')).toBe('bottom');

      wrapper.unmount();
    });

    it('reports no snap points when snapPoints are omitted', async () => {
      const wrapper = mount(SDrawer, {
        props: { open: true, title: 'Drawer', portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-vean-drawer-popup]').attributes('data-vean-snap-points')).toBe('false');

      wrapper.unmount();
    });

    it('re-measures the popup box when the viewport changes', async () => {
      const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');

      // Model the popup's `dvh`-capped box: its height follows the viewport.
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get: () => Math.min(1000, Math.max(0, (window.innerHeight ?? 0) - 32))
      });

      const innerHeightSpy = vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);

      try {
        const wrapper = mount(SDrawer, {
          props: {
            open: true,
            title: 'Drawer',
            snapPoints: [0.25, 0.5, 0.75],
            snapPoint: 0.5,
            portalProps: { disabled: true }
          },
          slots,
          attachTo: document.body
        });

        await nextTick();
        await nextTick();

        const popup = wrapper.find('[data-vean-drawer-popup]');

        // Box: min(1000, 1000 − 32) = 968; offset: 968 − 0.5 × 1000 = 468.
        expect(popup.attributes('style') ?? '').toMatch(/--vean-drawer-height:\s*968px/);
        expect(popup.attributes('style') ?? '').toMatch(/--vean-drawer-snap-point-offset:\s*468px/);

        // A viewport change while open re-measures the box in the same tick. The
        // published height and the viewport-derived offset must never disagree,
        // or the drawer rests at the wrong snap level until the observer's
        // debounced correction lands.
        innerHeightSpy.mockReturnValue(1200);
        window.dispatchEvent(new Event('resize'));
        await nextTick();

        // Box: min(1000, 1200 − 32) = 1000; offset: 1000 − 0.5 × 1200 = 400.
        expect(popup.attributes('style') ?? '').toMatch(/--vean-drawer-height:\s*1000px/);
        expect(popup.attributes('style') ?? '').toMatch(/--vean-drawer-snap-point-offset:\s*400px/);

        wrapper.unmount();
      } finally {
        innerHeightSpy.mockRestore();

        if (descriptor) {
          Object.defineProperty(HTMLElement.prototype, 'offsetHeight', descriptor);
        } else {
          Reflect.deleteProperty(HTMLElement.prototype, 'offsetHeight');
        }
      }
    });

    it('caps the box at the largest snap point so the far end of the content stays reachable', async () => {
      const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');

      // Model the stylesheet: the box is its content height clamped by the cap the
      // popup publishes, which is what `max-height: var(--vean-drawer-max-height)`
      // resolves to in a browser.
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get(this: HTMLElement) {
          const cap = Number.parseFloat(this.style.getPropertyValue('--vean-drawer-max-height'));

          return Number.isFinite(cap)
            ? Math.min(cap, 1600)
            : Math.min(1600, Math.max(0, (window.innerHeight ?? 0) - 32));
        }
      });

      const innerHeightSpy = vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);

      const mountAt = async (snapPoint: number) => {
        const wrapper = mount(SDrawer, {
          props: {
            open: true,
            title: 'Drawer',
            snapPoints: [0.25, 0.5, 0.75],
            snapPoint,
            portalProps: { disabled: true }
          },
          slots,
          attachTo: document.body
        });

        await nextTick();
        await nextTick();

        const style = wrapper.find('[data-vean-drawer-popup]').attributes('style') ?? '';

        wrapper.unmount();

        return style;
      };

      try {
        // Cap: 0.75 × 1000 = 750. At the largest snap the box rests flush against
        // the viewport edge (offset 0), so its whole scrolling window is on screen.
        const largest = await mountAt(0.75);

        expect(largest).toMatch(/--vean-drawer-max-height:\s*750px/);
        expect(largest).toMatch(/--vean-drawer-height:\s*750px/);
        expect(largest).toMatch(/--vean-drawer-snap-point-offset:\s*0px/);

        // A partial snap keeps the same visible extent as before the cap — it only
        // stops the box from hanging past the viewport edge: 750 − 250 = 0.5 × 1000.
        const half = await mountAt(0.5);

        expect(half).toMatch(/--vean-drawer-height:\s*750px/);
        expect(half).toMatch(/--vean-drawer-snap-point-offset:\s*250px/);
      } finally {
        innerHeightSpy.mockRestore();

        if (descriptor) {
          Object.defineProperty(HTMLElement.prototype, 'offsetHeight', descriptor);
        } else {
          Reflect.deleteProperty(HTMLElement.prototype, 'offsetHeight');
        }
      }
    });

    it('caps a horizontal drawer box by width instead of height', async () => {
      const innerWidthSpy = vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(400);

      try {
        const wrapper = mount(SDrawer, {
          props: {
            open: true,
            title: 'Drawer',
            side: 'right',
            snapPoints: [0.5, 0.75],
            snapPoint: 0.5,
            portalProps: { disabled: true }
          },
          slots,
          attachTo: document.body
        });

        await nextTick();

        const style = wrapper.find('[data-vean-drawer-popup]').attributes('style') ?? '';

        expect(style).toMatch(/--vean-drawer-max-width:\s*300px/);
        expect(style).not.toMatch(/--vean-drawer-max-height/);

        wrapper.unmount();
      } finally {
        innerWidthSpy.mockRestore();
      }
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
