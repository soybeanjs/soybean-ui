import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { SAppFooter } from '../../../src/components/app-footer';
import { SAppLogo } from '../../../src/components/app-logo';
import { SAppPageHeader } from '../../../src/components/app-page-header';

describe('SAppLogo', () => {
  it('renders title when showTitle and title are set', () => {
    const wrapper = mount(SAppLogo, { props: { title: 'Admin', logo: 'lucide:command' } });
    expect(wrapper.text()).toContain('Admin');
  });

  it('hides title when showTitle is false', () => {
    const wrapper = mount(SAppLogo, { props: { title: 'Admin', showTitle: false } });
    expect(wrapper.text()).not.toContain('Admin');
  });
});

describe('SAppPageHeader', () => {
  it('renders title and description', () => {
    const wrapper = mount(SAppPageHeader, { props: { title: 'Users', description: 'Manage users' } });
    expect(wrapper.text()).toContain('Users');
    expect(wrapper.text()).toContain('Manage users');
  });

  it('emits back when back button clicked', async () => {
    const wrapper = mount(SAppPageHeader, { props: { title: 'T', showBack: true } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('back')).toBeTruthy();
  });
});

describe('SAppFooter', () => {
  it('renders text and copyright', () => {
    const wrapper = mount(SAppFooter, { props: { text: 'Powered by', showCopyright: true } });
    expect(wrapper.text()).toContain('Powered by');
    expect(wrapper.text()).toContain('Copyright');
  });
});
