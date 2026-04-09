import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import type { AffixRootExposed } from '@soybeanjs/headless/affix';
import SAffix from '../../../src/components/affix/affix.vue';
import { getA11yViolations } from '../../shared/a11y';

function createRect(rect: Partial<DOMRect>): DOMRect {
  return {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON() {
      return {};
    },
    ...rect
  } as DOMRect;
}

function mockRect(element: HTMLElement, rect: () => DOMRect) {
  Object.defineProperty(element, 'getBoundingClientRect', {
    configurable: true,
    value: rect
  });
}

async function waitForAffixUpdate() {
  await nextTick();
  await new Promise<void>(resolve => {
    requestAnimationFrame(() => resolve());
  });
  await nextTick();
}

function getAffixRoot(wrapper: ReturnType<typeof mount>) {
  return wrapper.findComponent({ name: 'AffixRoot' }).vm as AffixRootExposed;
}

describe('SAffix', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SAffix, {
        slots: { default: 'Pinned content' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Pinned content');
      wrapper.unmount();
    });

    it('applies custom class to the affixed container', () => {
      const wrapper = mount(SAffix, {
        props: { class: 'my-affix-class' },
        slots: { default: 'Pinned content' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-state]').classes()).toContain('my-affix-class');
      wrapper.unmount();
    });
  });

  describe('affixed state', () => {
    it('affixes to the top when the offset threshold is reached', async () => {
      let targetTop = 0;
      const target = document.createElement('div');
      document.body.appendChild(target);

      const wrapper = mount(SAffix, {
        props: { offsetTop: 16, target: () => target },
        slots: { default: 'Pinned content' },
        attachTo: document.body
      });

      mockRect(wrapper.element as HTMLElement, () =>
        createRect({ top: 40, bottom: 80, left: 12, width: 120, height: 40, right: 132 })
      );
      mockRect(target, () => createRect({ top: targetTop, bottom: targetTop + 300, width: 400, height: 300 }));

      getAffixRoot(wrapper).updatePosition();
      await waitForAffixUpdate();

      expect(wrapper.find('[data-state]').attributes('data-state')).toBe('static');

      targetTop = 50;
      target.dispatchEvent(new Event('scroll'));
      await waitForAffixUpdate();

      const fixed = wrapper.find('[data-state]');
      expect(fixed.attributes('data-state')).toBe('fixed');
      expect(fixed.attributes('style')).toContain('position: fixed');
      expect(fixed.attributes('style')).toContain('top: 66px');
      expect(fixed.attributes('style')).toContain('left: 12px');
      expect(wrapper.emitted('change')).toEqual([[true]]);

      wrapper.unmount();
      target.remove();
    });

    it('affixes to the bottom when the bottom offset threshold is reached', async () => {
      let targetBottom = 800;
      const target = document.createElement('div');
      document.body.appendChild(target);

      const wrapper = mount(SAffix, {
        props: { offsetBottom: 24, target: () => target },
        slots: { default: 'Pinned content' },
        attachTo: document.body
      });

      mockRect(wrapper.element as HTMLElement, () =>
        createRect({ top: 720, bottom: 760, left: 24, width: 180, height: 40, right: 204 })
      );
      mockRect(target, () => createRect({ top: 0, bottom: targetBottom, width: 400, height: 800 }));

      getAffixRoot(wrapper).updatePosition();
      await waitForAffixUpdate();

      expect(wrapper.find('[data-state]').attributes('data-state')).toBe('static');

      targetBottom = 700;
      target.dispatchEvent(new Event('scroll'));
      await waitForAffixUpdate();

      const fixed = wrapper.find('[data-state]');
      const expectedBottom = 24 + window.innerHeight - targetBottom;

      expect(fixed.attributes('data-state')).toBe('fixed');
      expect(fixed.attributes('style')).toContain(`bottom: ${expectedBottom}px`);

      wrapper.unmount();
      target.remove();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SAffix, {
        slots: {
          default: '<button type="button">Pinned action</button>'
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
