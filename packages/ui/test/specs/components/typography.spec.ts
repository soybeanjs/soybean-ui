import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import STypographyParagraph from '@/components/typography/typography-paragraph.vue';
import STypographyText from '@/components/typography/typography-text.vue';
import STypographyTitle from '@/components/typography/typography-title.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('STypographyTitle', () => {
  describe('rendering', () => {
    it('renders an h1 by default', () => {
      const wrapper = mount(STypographyTitle, {
        slots: { default: 'Heading' },
        attachTo: document.body
      });

      expect(wrapper.element.tagName).toBe('H1');
      expect(wrapper.attributes('data-level')).toBe('1');

      wrapper.unmount();
    });

    it('renders the requested level tag', () => {
      const wrapper = mount(STypographyTitle, {
        props: { level: 4 },
        slots: { default: 'Heading' },
        attachTo: document.body
      });

      expect(wrapper.element.tagName).toBe('H4');

      wrapper.unmount();
    });

    it('applies custom class', () => {
      const wrapper = mount(STypographyTitle, {
        props: { class: 'my-title' },
        slots: { default: 'Heading' },
        attachTo: document.body
      });

      expect(wrapper.classes()).toContain('my-title');

      wrapper.unmount();
    });
  });
});

describe('STypographyParagraph', () => {
  describe('rendering', () => {
    it('renders a paragraph element', () => {
      const wrapper = mount(STypographyParagraph, {
        slots: { default: 'Body text' },
        attachTo: document.body
      });

      expect(wrapper.element.tagName).toBe('P');
      expect(wrapper.text()).toBe('Body text');

      wrapper.unmount();
    });

    it('renders a copy button when copyable', () => {
      const wrapper = mount(STypographyParagraph, {
        props: { copyable: true },
        slots: { default: 'Copy me' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-typography-paragraph]').attributes('data-copyable')).toBe('');
      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });

    it('does not render a copy button when not copyable', () => {
      const wrapper = mount(STypographyParagraph, {
        slots: { default: 'Plain' },
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(false);

      wrapper.unmount();
    });

    it('emits copied after clicking the copy button', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        configurable: true
      });

      const wrapper = mount(STypographyParagraph, {
        props: { copyable: true, copyText: 'payload' },
        slots: { default: 'Copy me' },
        attachTo: document.body
      });

      await wrapper.find('button').trigger('click');
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(wrapper.emitted('copied')?.[0]?.[0]).toBe('payload');

      wrapper.unmount();
    });
  });
});

describe('STypographyText', () => {
  describe('rendering', () => {
    it('renders a span by default', () => {
      const wrapper = mount(STypographyText, {
        slots: { default: 'Text' },
        attachTo: document.body
      });

      expect(wrapper.element.tagName).toBe('SPAN');

      wrapper.unmount();
    });

    it('renders a code element when code is set', () => {
      const wrapper = mount(STypographyText, {
        props: { code: true },
        slots: { default: 'npm i' },
        attachTo: document.body
      });

      expect(wrapper.element.tagName).toBe('CODE');
      expect(wrapper.attributes('data-code')).toBe('');

      wrapper.unmount();
    });

    it('renders a strong element when strong is set', () => {
      const wrapper = mount(STypographyText, {
        props: { strong: true },
        slots: { default: 'Bold' },
        attachTo: document.body
      });

      expect(wrapper.element.tagName).toBe('STRONG');

      wrapper.unmount();
    });

    it('renders a del element when delete is set', () => {
      const wrapper = mount(STypographyText, {
        props: { delete: true },
        slots: { default: 'Old' },
        attachTo: document.body
      });

      expect(wrapper.element.tagName).toBe('DEL');
      expect(wrapper.attributes('data-delete')).toBe('');

      wrapper.unmount();
    });

    it('reflects data-type', () => {
      const wrapper = mount(STypographyText, {
        props: { type: 'success' },
        slots: { default: 'Ok' },
        attachTo: document.body
      });

      expect(wrapper.attributes('data-type')).toBe('success');

      wrapper.unmount();
    });
  });
});

describe('accessibility', () => {
  it('has no a11y violations across the family', async () => {
    const wrapper = mount(
      {
        components: { STypographyTitle, STypographyParagraph, STypographyText },
        template: `
          <div>
            <STypographyTitle :level="2">Accessible heading</STypographyTitle>
            <STypographyParagraph copyable>Accessible paragraph body copy.</STypographyParagraph>
            <STypographyText type="secondary">Accessible text.</STypographyText>
          </div>
        `
      },
      { attachTo: document.body }
    );

    const violations = await getA11yViolations(wrapper.element);
    expect(violations).toHaveLength(0);

    wrapper.unmount();
  });
});
