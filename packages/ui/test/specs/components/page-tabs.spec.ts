import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SConfigProvider from '@/components/config-provider/config-provider.vue';
import SPageTabs from '@/components/page-tabs/page-tabs.vue';
import { getA11yViolations } from '../../shared/a11y';

const createItems = () => [
  { value: 'home', label: 'Home', pinned: true, hidePinnedIcon: true },
  { value: 'profile', label: 'Profile' },
  { value: 'settings', label: 'Settings' }
];

const createPinItems = () => [
  { value: 'home', label: 'Home', pinned: true },
  { value: 'profile', label: 'Profile' },
  { value: 'settings', label: 'Settings' }
];

describe('SPageTabs', () => {
  describe('rendering', () => {
    it('renders all page tab items', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-page-tabs-root]').exists()).toBe(true);
      expect(wrapper.findAll('[data-soybean-page-tabs-item]')).toHaveLength(3);

      wrapper.unmount();
    });

    it('renders tab labels', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Home');
      expect(wrapper.text()).toContain('Profile');
      expect(wrapper.text()).toContain('Settings');

      wrapper.unmount();
    });

    it('renders close buttons only for closable (non-pinned) tabs', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.findAll('[data-soybean-page-tabs-close]')).toHaveLength(2);

      wrapper.unmount();
    });

    it('renders pin button only for pinned tabs', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createPinItems(), modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.findAll('[data-soybean-page-tabs-pin]')).toHaveLength(1);

      wrapper.unmount();
    });

    it('renders chrome indicator svg by default', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', variant: 'chrome' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-page-tabs-item]').find('svg').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders slider indicator for the slider variant', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', variant: 'slider' },
        attachTo: document.body
      });

      const item = wrapper.findAll('[data-soybean-page-tabs-item]')[0];

      expect(item.find('div[class*="h-0.5"]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies a custom root class', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', class: 'my-page-tabs' },
        attachTo: document.body
      });

      expect(wrapper.find('.my-page-tabs').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('selected state', () => {
    it('marks the selected item with data-selected="true"', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.findAll('[data-soybean-page-tabs-item]')[0].attributes('data-selected')).toBe('true');
      expect(wrapper.findAll('[data-soybean-page-tabs-item]')[1].attributes('data-selected')).toBe('false');

      wrapper.unmount();
    });

    it('emits update:modelValue and click when an item is clicked', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('profile');
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')![0][0]).toMatchObject({ value: 'profile', label: 'Profile' });

      wrapper.unmount();
    });

    it('syncs data-selected internally after selection', async () => {
      // uncontrolled: no modelValue prop, so the internal state drives the DOM
      const wrapper = mount(SPageTabs, {
        props: { items: createItems() },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('click');

      const items = wrapper.findAll('[data-soybean-page-tabs-item]');

      expect(items[0].attributes('data-selected')).toBe('false');
      expect(items[1].attributes('data-selected')).toBe('true');

      wrapper.unmount();
    });

    it('does not emit click when the selected tab is clicked', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[0].trigger('click');

      expect(wrapper.emitted('click')).toBeFalsy();

      wrapper.unmount();
    });

    it('emits close on middle click for a closable item', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', middleClickClose: true },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('mousedown', { button: 1 });

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')![0][0]).toMatchObject({ value: 'profile', label: 'Profile' });

      wrapper.unmount();
    });

    it('does not close on middle click when middleClickClose is false', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', middleClickClose: false },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('mousedown', { button: 1 });

      expect(wrapper.emitted('close')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('keyboard interaction', () => {
    it('activates a tab with the Enter key', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('keydown', { key: 'Enter' });

      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('profile');

      wrapper.unmount();
    });

    it('closes a tab with the Backspace key', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('keydown', { key: 'Backspace' });

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')![0][0]).toMatchObject({ value: 'profile' });

      wrapper.unmount();
    });
  });

  describe('close behavior', () => {
    it('emits close with tab data when the close button is clicked', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-close]')[0].trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')![0][0]).toMatchObject({ value: 'profile', label: 'Profile' });

      wrapper.unmount();
    });

    it('does not emit close for a pinned item', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', middleClickClose: true },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[0].trigger('mousedown', { button: 1 });

      expect(wrapper.emitted('close')).toBeFalsy();

      wrapper.unmount();
    });

    it('blocks close when beforeClose returns false', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', beforeClose: () => false },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-close]')[0].trigger('click');

      expect(wrapper.emitted('close')).toBeFalsy();
      expect(wrapper.findAll('[data-soybean-page-tabs-item]')).toHaveLength(3);

      wrapper.unmount();
    });

    it('allows close when an async beforeClose resolves to true', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', beforeClose: async () => true },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-close]')[0].trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.findAll('[data-soybean-page-tabs-item]')).toHaveLength(2);

      wrapper.unmount();
    });

    it('activates a sibling tab when the active tab is closed', async () => {
      const items = createItems();
      const wrapper = mount(SPageTabs, {
        props: { items, modelValue: 'profile' },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-close]')[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')!.at(-1)![0]).toBe('settings');

      wrapper.unmount();
    });
  });

  describe('pin behavior', () => {
    it('emits pin with the new pinned state when the pin button is clicked', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createPinItems(), modelValue: 'home' },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-page-tabs-pin]').trigger('click');

      expect(wrapper.emitted('pin')).toBeTruthy();
      expect(wrapper.emitted('pin')![0][0]).toMatchObject({ value: 'home', label: 'Home' });

      wrapper.unmount();
    });

    it('sorts pinned tabs to the front on mount', () => {
      // controlled items: the reordering is emitted via update:items
      const wrapper = mount(SPageTabs, {
        props: {
          items: [
            { value: 'normal1', label: 'N1' },
            { value: 'pinned1', label: 'P1', pinned: true },
            { value: 'normal2', label: 'N2' },
            { value: 'hidden', label: 'H', pinned: true, hidePinnedIcon: true }
          ],
          modelValue: 'normal1'
        },
        attachTo: document.body
      });

      const emitted = wrapper.emitted('update:items')?.[0]?.[0] as Array<{ value: string }> | undefined;

      expect(emitted?.map(item => item.value)).toEqual(['pinned1', 'hidden', 'normal1', 'normal2']);

      wrapper.unmount();
    });

    it('keeps the relative order within each zone when sorting', () => {
      // zone invariant that drag reordering relies on: pinned → unpinned,
      // with the relative order inside a zone preserved (hidePinnedIcon is
      // display-only and does not affect the zone)
      const wrapper = mount(SPageTabs, {
        props: {
          items: [
            { value: 'hidden2', label: 'H2', pinned: true, hidePinnedIcon: true },
            { value: 'normal1', label: 'N1' },
            { value: 'pinned2', label: 'P2', pinned: true },
            { value: 'normal2', label: 'N2' },
            { value: 'pinned1', label: 'P1', pinned: true },
            { value: 'normal3', label: 'N3' }
          ],
          modelValue: 'normal1'
        },
        attachTo: document.body
      });

      const emitted = wrapper.emitted('update:items')?.[0]?.[0] as Array<{ value: string }> | undefined;

      expect(emitted?.map(item => item.value)).toEqual([
        'hidden2',
        'pinned2',
        'pinned1',
        'normal1',
        'normal2',
        'normal3'
      ]);

      wrapper.unmount();
    });
  });

  describe('drag behavior', () => {
    it('locks an item with an explicit draggable: false even when the component enables dragging', () => {
      const wrapper = mount(SPageTabs, {
        props: {
          items: [
            { value: 'home', label: 'Home', pinned: true, draggable: false },
            { value: 'profile', label: 'Profile' },
            { value: 'settings', label: 'Settings' }
          ],
          modelValue: 'home',
          draggable: true
        },
        attachTo: document.body
      });

      const tabs = wrapper.findAll('[data-soybean-page-tabs-item]');

      expect(tabs[0].attributes('data-draggable')).toBe('false');
      expect(tabs[1].attributes('data-draggable')).toBe('true');
      expect(tabs[2].attributes('data-draggable')).toBe('true');

      wrapper.unmount();
    });
  });

  describe('context menu', () => {
    it('emits contextmenu with the hovered tab', async () => {
      const wrapper = mount(SPageTabs, {
        props: {
          items: createItems(),
          modelValue: 'home',
          menuFactory: () => []
        },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('pointerenter');

      expect(wrapper.emitted('contextmenu')).toBeTruthy();
      expect(wrapper.emitted('contextmenu')![0][0]).toMatchObject({ value: 'profile', label: 'Profile' });

      wrapper.unmount();
    });

    it('passes closable state into the menu factory options', async () => {
      const menuFactory = () => [];
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home', menuFactory },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('pointerenter');

      expect(wrapper.emitted('contextmenu')).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('localization', () => {
    it('localizes close and pin button aria-labels from the locale registry', () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createPinItems(), modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-page-tabs-close]').attributes('aria-label')).toBe('Close tab');
      expect(wrapper.find('[data-soybean-page-tabs-pin]').attributes('aria-label')).toBe('Unpin tab');

      wrapper.unmount();
    });

    it('applies zh-CN locale via ConfigProvider', () => {
      const wrapper = mount(
        {
          components: { SPageTabs, SConfigProvider },
          template: `
            <SConfigProvider locale="zh-CN">
              <SPageTabs :items="items" model-value="home" />
            </SConfigProvider>
          `,
          data: () => ({ items: createPinItems() })
        },
        { attachTo: document.body }
      );

      expect(wrapper.find('[data-soybean-page-tabs-close]').attributes('aria-label')).toBe('关闭标签页');
      expect(wrapper.find('[data-soybean-page-tabs-pin]').attributes('aria-label')).toBe('取消固定标签页');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createItems(), modelValue: 'home' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });

    it('has no a11y violations with pinned tabs', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items: createPinItems(), modelValue: 'home' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
