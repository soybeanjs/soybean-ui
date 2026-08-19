import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SCode from '@/components/code/code.vue';
import { getA11yViolations } from '../../shared/a11y';

const sampleCode = `const a = 1;\nconst b = 2;`;

describe('SCode', () => {
  describe('rendering', () => {
    it('renders the code as escaped text', () => {
      const wrapper = mount(SCode, {
        props: { code: '<script>alert(1)</script>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-code]').text()).toContain('<script>alert(1)</script>');

      wrapper.unmount();
    });

    it('reflects the language attribute', () => {
      const wrapper = mount(SCode, {
        props: { code: sampleCode, language: 'ts' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-code]').attributes('data-language')).toBe('ts');

      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(SCode, {
        props: { code: sampleCode, class: 'my-code' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-code-root]').classes()).toContain('my-code');

      wrapper.unmount();
    });
  });

  describe('line numbers', () => {
    it('renders one line number per source line', () => {
      const wrapper = mount(SCode, {
        props: { code: sampleCode, lineNumbers: true },
        attachTo: document.body
      });

      expect(wrapper.findAll('[data-soybean-code-line-number]')).toHaveLength(2);

      wrapper.unmount();
    });

    it('does not render line numbers when disabled', () => {
      const wrapper = mount(SCode, {
        props: { code: sampleCode },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-code-line-numbers]').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('highlight', () => {
    it('renders highlighted HTML when a highlight function is provided', () => {
      const wrapper = mount(SCode, {
        props: {
          code: sampleCode,
          highlight: (code: string) => code.replace('const', '<span class="kw">const</span>')
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-code] .kw').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('copyable', () => {
    it('renders a copy button when copyable', () => {
      const wrapper = mount(SCode, {
        props: { code: sampleCode, copyable: true },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-code-root]').attributes('data-copyable')).toBe('');
      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });

    it('emits copied after clicking the copy button', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        configurable: true
      });

      const wrapper = mount(SCode, {
        props: { code: sampleCode, copyable: true },
        attachTo: document.body
      });

      await wrapper.find('button').trigger('click');
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(wrapper.emitted('copied')?.[0]?.[0]).toBe(sampleCode);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SCode, {
        props: { code: sampleCode, lineNumbers: true, copyable: true },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
