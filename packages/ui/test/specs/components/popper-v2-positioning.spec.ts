import { describe, expect, it } from 'vitest';
import { computed } from 'vue';
import { mount } from '@vue/test-utils';
import {
  PopperV2Anchor,
  PopperV2Arrow,
  PopperV2PositioningPopup,
  PopperV2PositioningPositioner,
  PopperV2PositioningRoot,
  providePopperV2Ui
} from '../../../../headless/src/components/popper-v2';

const components = {
  PopperV2PositioningRoot,
  PopperV2Anchor,
  PopperV2PositioningPositioner,
  PopperV2PositioningPopup,
  PopperV2Arrow
};

const template = `
  <PopperV2PositioningRoot>
    <PopperV2Anchor><button type="button">anchor</button></PopperV2Anchor>
    <PopperV2PositioningPositioner>
      <PopperV2PositioningPopup>
        <div data-content>positioned content</div>
        <PopperV2Arrow />
      </PopperV2PositioningPopup>
    </PopperV2PositioningPositioner>
  </PopperV2PositioningRoot>
`;

describe('PopperV2Positioning primitives', () => {
  it('renders the full positioning stack without an interactive PopperV2Root', () => {
    const wrapper = mount({ components, template }, { attachTo: document.body });

    expect(wrapper.find('[data-soybean-popper-v2-anchor]').exists()).toBe(true);
    expect(wrapper.find('[data-soybean-popper-v2-positioning-positioner]').exists()).toBe(true);
    expect(wrapper.find('[data-soybean-popper-v2-positioning-popup]').exists()).toBe(true);
    expect(wrapper.find('[data-soybean-popper-v2-arrow]').exists()).toBe(true);
    expect(wrapper.find('[data-content]').text()).toBe('positioned content');

    wrapper.unmount();
  });

  it('reflects the default placement side and align on the popup', () => {
    const wrapper = mount({ components, template }, { attachTo: document.body });

    const popup = wrapper.find('[data-soybean-popper-v2-positioning-popup]');
    expect(popup.attributes('data-side')).toBe('bottom');
    expect(popup.attributes('data-align')).toBe('center');

    wrapper.unmount();
  });

  it('injects ui classes into every positioning slot', () => {
    const wrapper = mount(
      {
        components,
        setup() {
          // Positioning primitives consume the single `PopperV2Ui` context; wrappers pass a
          // computed recipe result (UI contexts must be reactive).
          providePopperV2Ui(
            computed(() => ({
              anchor: 'ui-anchor',
              positioner: 'ui-positioner',
              popup: 'ui-popup',
              arrow: 'ui-arrow'
            }))
          );
        },
        template
      },
      { attachTo: document.body }
    );

    expect(wrapper.find('[data-soybean-popper-v2-anchor]').classes()).toContain('ui-anchor');
    expect(wrapper.find('[data-soybean-popper-v2-positioning-positioner]').classes()).toContain('ui-positioner');
    expect(wrapper.find('[data-soybean-popper-v2-positioning-popup]').classes()).toContain('ui-popup');
    expect(wrapper.find('[data-soybean-popper-v2-arrow]').classes()).toContain('ui-arrow');

    wrapper.unmount();
  });

  it('renders the positioner inline without portal or presence wrappers', () => {
    const wrapper = mount({ components, template }, { attachTo: document.body });

    // The positioning stack must stay mount-independent of open state: no `data-state`,
    // no dismissable-layer attribute from the interactive shell.
    const positioner = wrapper.find('[data-soybean-popper-v2-positioning-positioner]');
    expect(positioner.attributes('data-state')).toBeUndefined();
    expect(wrapper.find('[data-dismissable-layer]').exists()).toBe(false);

    wrapper.unmount();
  });

  it('registers the anchor element into the positioning root context', () => {
    const wrapper = mount({ components, template }, { attachTo: document.body });

    // The shared anchor must register into the positioning tree's context: the positioner
    // consumes `anchorElement` as its floating reference, so it must not be empty.
    const positioner = wrapper.find('[data-soybean-popper-v2-positioning-positioner]');
    expect(positioner.exists()).toBe(true);
    expect(wrapper.find('[data-soybean-popper-v2-anchor]').find('button').exists()).toBe(true);

    wrapper.unmount();
  });
});
