import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SPopper from '@/components/popper/popper.vue';

describe('SPopper', () => {
  const slots = {
    trigger: '<button type="button">Open Popper</button>',
    default: '<div data-content>Popper content</div>'
  };

  afterEach(() => {
    // Defensive cleanup: a leaked lock must never bleed into other specs.
    document.body.removeAttribute('data-scroll-lock');
    document.body.classList.remove('scroll-lock-body', 'scroll-lock-body-with-scrollbar');
    document.body.style.removeProperty('top');
    document.documentElement.classList.remove('scroll-lock-html');
  });

  describe('body scroll lock', () => {
    it('locks body scroll while modal popper is open', async () => {
      const wrapper = mount(SPopper, {
        props: {
          open: true,
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);

      wrapper.unmount();
    });

    it('does not lock body scroll when modal is false', async () => {
      const wrapper = mount(SPopper, {
        props: {
          open: true,
          modal: false,
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);

      wrapper.unmount();
    });

    it('releases scroll lock when open becomes false even while the positioner stays mounted', async () => {
      // forceMount keeps the positioner impl alive after close, so this regression-tests
      // that the lock follows `open` instead of waiting for unmount.
      const wrapper = mount(SPopper, {
        props: {
          open: true,
          portalProps: { disabled: true },
          positionerProps: { forceMount: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);

      await wrapper.setProps({ open: false });
      await nextTick();

      expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);
      expect(document.querySelector('[data-soybean-popper-positioner-impl]')).not.toBeNull();

      wrapper.unmount();
    });

    it('does not lock body scroll when mounted closed with forceMount', async () => {
      const wrapper = mount(SPopper, {
        props: {
          open: false,
          portalProps: { disabled: true },
          positionerProps: { forceMount: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);

      wrapper.unmount();
    });
  });
});
