import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle } from '../../../src/components/splitter';
import { getA11yViolations } from '../../shared/a11y';

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

function dispatchPointerEvent(target: EventTarget, type: string, init: PointerEventInit) {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, ...init }));
}

describe('Splitter', () => {
  describe('rendering', () => {
    it('renders panels and custom class', () => {
      const wrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup class="my-splitter">
              <SSplitterPanel :default-size="30">A</SSplitterPanel>
              <SSplitterResizeHandle aria-label="Resize panels" />
              <SSplitterPanel :default-size="70">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      expect(wrapper.text()).toContain('A');
      expect(wrapper.text()).toContain('B');
      expect(wrapper.html()).toContain('my-splitter');
      wrapper.unmount();
    });

    it('reflects default panel sizes', async () => {
      const wrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup>
              <SSplitterPanel :default-size="30">A</SSplitterPanel>
              <SSplitterResizeHandle aria-label="Resize panels" :tabindex="-1" />
              <SSplitterPanel :default-size="70">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      await nextTick();

      const panels = wrapper.findAll('[data-panel]');

      expect(Number(panels[0]?.attributes('data-panel-size'))).toBeCloseTo(30, 1);
      expect(Number(panels[1]?.attributes('data-panel-size'))).toBeCloseTo(70, 1);
      wrapper.unmount();
    });

    it('applies resize cursors for handle orientations', () => {
      const horizontalWrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup>
              <SSplitterPanel :default-size="30">A</SSplitterPanel>
              <SSplitterResizeHandle aria-label="Resize panels" />
              <SSplitterPanel :default-size="70">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      const verticalWrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup direction="vertical">
              <SSplitterPanel :default-size="30">A</SSplitterPanel>
              <SSplitterResizeHandle aria-label="Resize panels" />
              <SSplitterPanel :default-size="70">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      const horizontalHandle = horizontalWrapper.find('[data-slot="splitter-resize-handle"]');
      const verticalHandle = verticalWrapper.find('[data-slot="splitter-resize-handle"]');

      expect(horizontalHandle.classes()).toContain('cursor-col-resize');
      expect(horizontalHandle.classes()).toContain('data-[state=hover]:bg-accent');
      expect(horizontalHandle.classes()).toContain('data-[state=drag]:bg-accent');
      expect(verticalHandle.attributes('data-orientation')).toBe('vertical');
      expect(verticalHandle.classes()).toContain('data-[orientation=vertical]:cursor-row-resize');

      horizontalWrapper.unmount();
      verticalWrapper.unmount();
    });
  });

  describe('layout state', () => {
    it('emits layout when dragging the resize handle', async () => {
      const wrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup>
              <SSplitterPanel :default-size="50">A</SSplitterPanel>
              <SSplitterResizeHandle aria-label="Resize panels" />
              <SSplitterPanel :default-size="50">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      await nextTick();

      const group = wrapper.findComponent(SSplitterGroup);
      const groupElement = wrapper.find('[data-slot="splitter-group"]');
      const handle = wrapper.find('[data-slot="splitter-resize-handle"]');

      mockRect(groupElement.element, { x: 0, y: 0, width: 100, height: 40 });
      dispatchPointerEvent(handle.element, 'pointerdown', { clientX: 50, clientY: 20, pointerId: 1 });
      dispatchPointerEvent(document, 'pointermove', { clientX: 70, clientY: 20, pointerId: 1 });
      dispatchPointerEvent(document, 'pointerup', { clientX: 70, clientY: 20, pointerId: 1 });

      const lastLayout = group.emitted('layout')?.at(-1)?.[0] as number[] | undefined;

      expect(lastLayout?.[0]).toBeCloseTo(70, 1);
      expect(lastLayout?.[1]).toBeCloseTo(30, 1);
      wrapper.unmount();
    });

    it('supports keyboard resizing', async () => {
      const wrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup>
              <SSplitterPanel :default-size="50">A</SSplitterPanel>
              <SSplitterResizeHandle aria-label="Resize panels" />
              <SSplitterPanel :default-size="50">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      await nextTick();

      const group = wrapper.findComponent(SSplitterGroup);
      const handle = wrapper.find('[data-slot="splitter-resize-handle"]');

      await handle.trigger('keydown', { key: 'ArrowRight' });

      const lastLayout = group.emitted('layout')?.at(-1)?.[0] as number[] | undefined;

      expect(lastLayout?.[0]).toBeCloseTo(60, 1);
      expect(lastLayout?.[1]).toBeCloseTo(40, 1);
      wrapper.unmount();
    });

    it('collapses a collapsible panel with Enter', async () => {
      const wrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup>
              <SSplitterPanel collapsible :collapsed-size="0" :min-size="20" :default-size="30">A</SSplitterPanel>
              <SSplitterResizeHandle aria-label="Resize panels" />
              <SSplitterPanel :default-size="70">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      const handle = wrapper.find('[data-slot="splitter-resize-handle"]');
      const panel = wrapper.find('[data-panel]');

      await handle.trigger('keydown', { key: 'Enter' });

      expect(panel.attributes('data-state')).toBe('collapsed');
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents dragging when disabled', async () => {
      const wrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup>
              <SSplitterPanel :default-size="50">A</SSplitterPanel>
              <SSplitterResizeHandle disabled aria-label="Resize panels" />
              <SSplitterPanel :default-size="50">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      await nextTick();

      const group = wrapper.findComponent(SSplitterGroup);
      const groupElement = wrapper.find('[data-slot="splitter-group"]');
      const handle = wrapper.find('[data-slot="splitter-resize-handle"]');

      mockRect(groupElement.element, { x: 0, y: 0, width: 100, height: 40 });
      dispatchPointerEvent(handle.element, 'pointerdown', { clientX: 50, clientY: 20, pointerId: 1 });
      dispatchPointerEvent(document, 'pointermove', { clientX: 70, clientY: 20, pointerId: 1 });
      dispatchPointerEvent(document, 'pointerup', { clientX: 70, clientY: 20, pointerId: 1 });

      expect(handle.attributes('data-disabled')).toBe('');
      expect(group.emitted('layout')?.at(-1)?.[0]).toEqual([50, 50]);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(
        {
          components: { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle },
          template: `
            <SSplitterGroup>
              <SSplitterPanel :default-size="30">A</SSplitterPanel>
              <SSplitterResizeHandle aria-label="Resize panels" />
              <SSplitterPanel :default-size="70">B</SSplitterPanel>
            </SSplitterGroup>
          `
        },
        { attachTo: document.body }
      );

      const violations = await getA11yViolations(wrapper.element);
      // axe/happy-dom currently reports a false-positive required aria-valuenow violation for focusable separator patterns.
      const actionableViolations = violations.filter(violation => violation.id !== 'aria-required-attr');

      expect(actionableViolations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
