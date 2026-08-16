import { describe, expect, it } from 'vitest';
import { defineComponent, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { provideAppLayoutContext, useAppLayoutContext } from '../../../src/composables/use-app-layout-context';

function createContextValue() {
  return {
    mode: ref('vertical' as const),
    open: ref(true),
    siderCollapse: ref(false),
    isMobile: ref(false),
    mixSiderFixed: ref(false),
    hasSecondLevel: ref(true),
    mixHasDrawer: ref(false),
    mixMenuWidth: ref(220),
    sidebarWidth: ref(220),
    collapsedSidebarWidth: ref(64),
    siderVisible: ref(true),
    headerMenuEl: ref('app-header-menu'),
    siderMenuEl: ref('app-sider-menu')
  };
}

const Consumer = defineComponent({
  setup() {
    const context = useAppLayoutContext();
    return { context };
  },
  template: '<div>{{ context ? context.mode : "null" }}</div>'
});

describe('useAppLayoutContext', () => {
  it('should provide and inject the layout context', () => {
    const Provider = defineComponent({
      setup() {
        provideAppLayoutContext(createContextValue());
        return {};
      },
      template: '<slot />'
    });

    const App = defineComponent({
      components: { Provider, Consumer },
      template: '<Provider><Consumer /></Provider>'
    });

    const wrapper = mount(App);
    expect(wrapper.text()).toBe('vertical');
  });

  it('should return null (optional injection) when no AppLayout provides it', () => {
    const wrapper = mount(Consumer);
    expect(wrapper.text()).toBe('null');
  });
});
