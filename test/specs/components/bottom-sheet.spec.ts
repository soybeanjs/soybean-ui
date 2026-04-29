import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import SBottomSheet from '../../../src/components/bottom-sheet/bottom-sheet.vue';

describe('SBottomSheet', () => {
  describe('state', () => {
    it('moves focus into the dialog when opened from the trigger', async () => {
      const wrapper = mount(SBottomSheet, {
        props: {
          title: 'Bottom Sheet Title'
        },
        slots: {
          trigger: '<button type="button">Open</button>',
          default: '<div>Bottom Sheet Content</div>'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await nextTick();
      await nextTick();

      const popup = document.body.querySelector('[role="dialog"]');

      expect(popup).toBeTruthy();
      expect(document.activeElement).toBe(popup);
      expect(document.activeElement?.closest('[aria-hidden="true"]')).toBeNull();

      wrapper.unmount();
    });
  });
});
