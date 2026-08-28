import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SConfigProvider from '@/components/config-provider/config-provider.vue';
import type { MenuOptionData } from '@/components/menu';
import { STreeNav } from '@/components/tree-nav';
import { getA11yViolations } from '../../shared/a11y';

const items: MenuOptionData<string>[] = [
  {
    value: 'docs',
    label: 'Docs',
    children: [
      { value: 'getting-started', label: 'Getting Started' },
      {
        value: 'components',
        label: 'Components',
        children: [
          { value: 'button', label: 'Button' },
          { value: 'input', label: 'Input' }
        ]
      },
      { value: 'print', label: 'Print', disabled: true }
    ]
  },
  {
    value: 'blog',
    label: 'Blog',
    children: [{ value: 'announcements', label: 'Announcements' }]
  },
  { value: 'pricing', label: 'Pricing' },
  { value: 'private', label: 'Private', disabled: true },
  { value: 'github', label: 'GitHub', href: 'https://github.com/soybeanjs/soybean-ui' }
];

function mountTreeNav(props: Record<string, unknown> = {}) {
  return mount(
    {
      components: { SConfigProvider, STreeNav },
      setup() {
        return { items };
      },
      template: `
        <SConfigProvider>
          <STreeNav :items="items" :portal-props="{ disabled: true }" v-bind="extraProps" />
        </SConfigProvider>
      `,
      data() {
        return { extraProps: props };
      }
    },
    { attachTo: document.body }
  );
}

function findLeafButton(wrapper: ReturnType<typeof mount>, label: string) {
  return wrapper.findAll('button').find(button => button.text() === label);
}

describe('STreeNav', () => {
  describe('rendering', () => {
    it('renders the nav root with branch triggers, plain leaves and link leaves', () => {
      const wrapper = mountTreeNav();

      expect(wrapper.find('[data-soybean-tree-nav]').exists()).toBe(true);
      // Branch entries render dropdown triggers for "docs" and "blog".
      expect(wrapper.findAll('[data-soybean-dropdown-menu-trigger]')).toHaveLength(2);
      // Plain leaf and disabled leaf render as buttons.
      expect(findLeafButton(wrapper, 'Pricing')).toBeTruthy();
      const privateLeaf = findLeafButton(wrapper, 'Private');
      expect(privateLeaf).toBeTruthy();
      expect(privateLeaf?.attributes('aria-disabled')).toBe('true');
      // Link leaf renders an anchor.
      expect(wrapper.find('a[href="https://github.com/soybeanjs/soybean-ui"]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies the size variant class to the root', () => {
      const wrapper = mountTreeNav({ size: 'sm' });

      expect(wrapper.find('[data-soybean-tree-nav]').classes()).toContain('text-xs');

      wrapper.unmount();
    });

    it('renders a chevron icon inside branch triggers', () => {
      const wrapper = mountTreeNav();

      const docsTrigger = wrapper.find('[data-soybean-dropdown-menu-trigger]');
      expect(docsTrigger.find('svg').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('selection state', () => {
    it('marks the selected top-level leaf as active via data-active', () => {
      const wrapper = mountTreeNav({ defaultValue: 'pricing' });

      const pricing = findLeafButton(wrapper, 'Pricing');
      expect(pricing?.attributes('data-active')).toBe('true');
      expect(pricing?.attributes('data-child-active')).toBeUndefined();

      // Siblings are marked inactive.
      const githubLink = wrapper.find('a[href="https://github.com/soybeanjs/soybean-ui"]');
      expect(githubLink.attributes('data-active')).toBe('false');

      wrapper.unmount();
    });

    it('highlights the ancestor chain of a selected nested leaf via data-child-active', () => {
      const wrapper = mountTreeNav({ defaultValue: 'button' });

      const [docsTrigger, blogTrigger] = wrapper.findAll('[data-soybean-dropdown-menu-trigger]');
      expect(docsTrigger.attributes('data-child-active')).toBe('');
      expect(blogTrigger.attributes('data-child-active')).toBeUndefined();

      wrapper.unmount();
    });

    it('never marks branch triggers active even when their own value matches', () => {
      // Container nodes carry no active state, aligned with TreeMenu.
      const wrapper = mountTreeNav({ defaultValue: 'docs' });

      const docsTrigger = wrapper.find('[data-soybean-dropdown-menu-trigger]');
      expect(docsTrigger.attributes('data-active')).toBe('false');

      wrapper.unmount();
    });
  });

  describe('interaction', () => {
    it('emits update:modelValue and select when a plain leaf is clicked', async () => {
      const wrapper = mount(STreeNav, {
        props: { items, portalProps: { disabled: true } },
        attachTo: document.body
      });

      await findLeafButton(wrapper, 'Pricing')!.trigger('click');

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['pricing']);
      expect(wrapper.emitted('select')?.at(-1)?.[0]).toMatchObject({ value: 'pricing' });

      wrapper.unmount();
    });

    it('marks the clicked leaf as active in uncontrolled mode', async () => {
      const wrapper = mountTreeNav();

      const pricing = findLeafButton(wrapper, 'Pricing');
      await pricing!.trigger('click');

      expect(pricing!.attributes('data-active')).toBe('true');

      wrapper.unmount();
    });

    it('ignores clicks on disabled leaves', async () => {
      const wrapper = mountTreeNav();

      await findLeafButton(wrapper, 'Private')!.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      expect(wrapper.emitted('select')).toBeUndefined();

      wrapper.unmount();
    });

    it('respects controlled mode and keeps the bound selection unchanged', async () => {
      const wrapper = mount(STreeNav, {
        props: { items, modelValue: 'pricing', portalProps: { disabled: true } },
        attachTo: document.body
      });

      const githubLink = wrapper.find('a[href="https://github.com/soybeanjs/soybean-ui"]');
      await githubLink.trigger('click');

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['github']);

      // The controlled value stays "pricing": only the emit happens.
      expect(findLeafButton(wrapper, 'Pricing')?.attributes('data-active')).toBe('true');
      expect(githubLink.attributes('data-active')).toBe('false');

      wrapper.unmount();
    });

    it('emits update:modelValue for a nested leaf clicked inside a branch popup', async () => {
      const wrapper = mount(STreeNav, {
        props: { items, trigger: 'click', portalProps: { disabled: true } },
        attachTo: document.body
      });

      const docsTrigger = wrapper.find('[data-soybean-dropdown-menu-trigger]');
      await docsTrigger.trigger('click');
      await nextTick();
      await nextTick();

      expect(docsTrigger.attributes('aria-expanded')).toBe('true');
      expect(wrapper.find('[role="menu"][data-state="open"]').exists()).toBe(true);

      const startedItem = wrapper.findAll('[role="menuitem"]').find(item => item.text() === 'Getting Started');
      expect(startedItem).toBeTruthy();
      await startedItem!.trigger('click');
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['getting-started']);

      // The ancestor chain stays highlighted after selection.
      expect(docsTrigger.attributes('data-child-active')).toBe('');

      wrapper.unmount();
    });
  });

  describe('collapsible', () => {
    it('renders the overflow measurement container when collapsible', () => {
      const wrapper = mountTreeNav({ collapsible: true });

      expect(wrapper.find('[data-soybean-tree-nav-overflow]').exists()).toBe(true);

      // In the test environment content does not overflow, so no "more"
      // trigger is rendered and all items stay visible.
      expect(wrapper.findAll('[data-soybean-dropdown-menu-trigger]')).toHaveLength(2);
      expect(wrapper.text()).toContain('Pricing');
      expect(wrapper.text()).toContain('GitHub');

      wrapper.unmount();
    });

    it('does not render the overflow container without collapsible', () => {
      const wrapper = mountTreeNav();

      expect(wrapper.find('[data-soybean-tree-nav-overflow]').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the closed state', async () => {
      const wrapper = mountTreeNav();

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
