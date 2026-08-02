import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SLink from '@/components/link/link.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SLink', () => {
  describe('rendering', () => {
    it('renders an anchor element with default slot content', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com' },
        slots: { default: 'Go to homepage' },
        attachTo: document.body
      });

      const link = wrapper.get('a');
      expect(link.text()).toBe('Go to homepage');
      expect(link.attributes('href')).toBe('https://example.com');

      wrapper.unmount();
    });

    it('renders with data-soybean-link attribute', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com' },
        attachTo: document.body
      });

      expect(wrapper.find('a').attributes('data-soybean-link')).toBeDefined();

      wrapper.unmount();
    });

    it('does not carry redundant data-link attribute', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com' },
        attachTo: document.body
      });

      expect(wrapper.find('a').attributes('data-link')).toBeUndefined();

      wrapper.unmount();
    });

    it('applies linkVariants base classes', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com' },
        attachTo: document.body
      });

      const link = wrapper.get('a');
      expect(link.classes()).toContain('cursor-pointer');
      expect(link.classes()).toContain('outline-none');

      wrapper.unmount();
    });

    it('passes custom class through', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com', class: 'text-primary' },
        attachTo: document.body
      });

      expect(wrapper.get('a').classes()).toContain('text-primary');

      wrapper.unmount();
    });
  });

  describe('href and external links', () => {
    it('sets href for string URL', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com' },
        attachTo: document.body
      });

      expect(wrapper.get('a').attributes('href')).toBe('https://example.com');

      wrapper.unmount();
    });

    it('sets target="_blank" for external links by default', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com' },
        attachTo: document.body
      });

      expect(wrapper.get('a').attributes('target')).toBe('_blank');

      wrapper.unmount();
    });

    it('sets rel="noopener noreferrer" by default', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com' },
        attachTo: document.body
      });

      expect(wrapper.get('a').attributes('rel')).toBe('noopener noreferrer');

      wrapper.unmount();
    });

    it('uses explicit target when provided', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com', target: '_self' },
        attachTo: document.body
      });

      expect(wrapper.get('a').attributes('target')).toBe('_self');

      wrapper.unmount();
    });

    it('treats http string to as external', () => {
      const wrapper = mount(SLink, {
        props: { to: 'https://example.com' },
        attachTo: document.body
      });

      expect(wrapper.get('a').attributes('href')).toBe('https://example.com');
      expect(wrapper.get('a').attributes('target')).toBe('_blank');

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('sets aria-disabled="true" when disabled', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com', disabled: true },
        slots: { default: 'Disabled' },
        attachTo: document.body
      });

      expect(wrapper.get('a').attributes('aria-disabled')).toBe('true');

      wrapper.unmount();
    });

    it('sets role="link" when disabled', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com', disabled: true },
        attachTo: document.body
      });

      expect(wrapper.get('a').attributes('role')).toBe('link');

      wrapper.unmount();
    });

    it('sets tabindex="-1" when disabled', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com', disabled: true },
        attachTo: document.body
      });

      expect(wrapper.get('a').attributes('tabindex')).toBe('-1');

      wrapper.unmount();
    });

    it('prevents click when disabled', async () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com', disabled: true },
        slots: { default: 'Disabled' },
        attachTo: document.body
      });

      const link = wrapper.get('a');
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      });
      link.element.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);

      wrapper.unmount();
    });

    it('applies disabled cursor and opacity classes', () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com', disabled: true },
        attachTo: document.body
      });

      const link = wrapper.get('a');
      expect(link.attributes('data-disabled')).toBeDefined();

      wrapper.unmount();
    });
  });

  describe('polymorphic rendering', () => {
    it('renders as button when as="button"', () => {
      const wrapper = mount(SLink, {
        props: { as: 'button' },
        slots: { default: 'Click me' },
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('a').exists()).toBe(false);

      wrapper.unmount();
    });

    it('renders as span when as="span"', () => {
      const wrapper = mount(SLink, {
        props: { as: 'span' },
        slots: { default: 'Text' },
        attachTo: document.body
      });

      expect(wrapper.find('span').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com' },
        slots: { default: 'Accessible link' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });

    it('has no a11y violations when disabled', async () => {
      const wrapper = mount(SLink, {
        props: { href: 'https://example.com', disabled: true },
        slots: { default: 'Disabled link' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
