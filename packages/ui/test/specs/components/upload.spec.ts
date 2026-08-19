import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SUpload from '@/components/upload/upload.vue';
import { getA11yViolations } from '../../shared/a11y';

function createFile(name = 'test.txt', type = 'text/plain') {
  return new File(['hello'], name, { type });
}

describe('SUpload', () => {
  describe('rendering', () => {
    it('renders the trigger slot content', () => {
      const wrapper = mount(SUpload, {
        slots: { default: '<button>Upload file</button>' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Upload file');

      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(SUpload, {
        props: { class: 'my-upload' },
        slots: { default: '<span>Upload</span>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-upload-root]').classes()).toContain('my-upload');

      wrapper.unmount();
    });

    it('renders the file list when files are provided', () => {
      const file = createFile();
      const wrapper = mount(SUpload, {
        props: {
          fileList: [
            {
              uid: '1',
              name: 'test.txt',
              size: 5,
              type: 'text/plain',
              status: 'success',
              percent: 100,
              raw: file
            }
          ]
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-upload-file-list]').exists()).toBe(true);
      expect(wrapper.text()).toContain('test.txt');

      wrapper.unmount();
    });
  });

  describe('file selection', () => {
    it('adds files and emits update:fileList', async () => {
      const wrapper = mount(SUpload, {
        slots: { default: '<span>Upload</span>' },
        attachTo: document.body
      });

      const input = wrapper.find('input[type="file"]');
      const file = createFile();
      Object.defineProperty(input.element, 'files', { value: [file], configurable: true });

      await input.trigger('change');

      const emitted = wrapper.emitted('update:fileList')?.[0]?.[0];

      expect(Array.isArray(emitted)).toBe(true);
      expect(emitted).toHaveLength(1);
      expect(emitted[0].name).toBe('test.txt');

      wrapper.unmount();
    });

    it('calls customRequest with upload callbacks', async () => {
      const customRequest = vi.fn();
      const wrapper = mount(SUpload, {
        props: { customRequest },
        slots: { default: '<span>Upload</span>' },
        attachTo: document.body
      });

      const input = wrapper.find('input[type="file"]');
      const file = createFile();
      Object.defineProperty(input.element, 'files', { value: [file], configurable: true });

      await input.trigger('change');
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(customRequest).toHaveBeenCalledTimes(1);
      const options = customRequest.mock.calls[0]![0];

      expect(options.file.name).toBe('test.txt');
      expect(typeof options.onProgress).toBe('function');
      expect(typeof options.onSuccess).toBe('function');
      expect(typeof options.onError).toBe('function');

      wrapper.unmount();
    });

    it('does not add files when disabled', async () => {
      const wrapper = mount(SUpload, {
        props: { disabled: true },
        slots: { default: '<span>Upload</span>' },
        attachTo: document.body
      });

      const input = wrapper.find('input[type="file"]');
      Object.defineProperty(input.element, 'files', { value: [createFile()], configurable: true });

      await input.trigger('change');

      expect(wrapper.emitted('update:fileList')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('reflects data-disabled on the root', () => {
      const wrapper = mount(SUpload, {
        props: { disabled: true },
        slots: { default: '<span>Upload</span>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-upload-root]').attributes('data-disabled')).toBe('');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SUpload, {
        slots: { default: '<span>Upload a file</span>' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
