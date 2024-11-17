import { defineComponent, getCurrentInstance, h, ref, toRefs } from 'vue';
import { unrefElement } from '@vueuse/core';
import { usePresence } from '../../composables';
import { renderSlotFragments } from '../../shared';
import type { PresenceProps, PresenceSlots } from './types';

export const Presence = defineComponent<PresenceProps, {}, string, PresenceSlots>(
  (props, { slots, expose }) => {
    const instance = getCurrentInstance();
    const { present, forceMount } = toRefs(props);
    const node = ref<HTMLElement>();
    // Mount composables once to prevent duplicated eventListener
    const { isPresent } = usePresence(present, node);

    expose({ present: isPresent });

    let children = slots.default({ present: isPresent.value });
    children = renderSlotFragments(children || []);

    if (children?.length > 1) {
      const componentName = instance?.parent?.type.name ? `<${instance.parent.type.name} />` : 'component';

      throw new Error(
        [
          `Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
          '',
          'Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.',
          'You can apply a few solutions:',
          [
            'Provide a single child element so that `presence` directive attach correctly.',
            'Ensure the first child is an actual element instead of a raw text node or comment node.'
          ]
            .map(line => `  - ${line}`)
            .join('\n')
        ].join('\n')
      );
    }

    return () => {
      if (forceMount?.value || present.value || isPresent.value) {
        return h(slots.default({ present: isPresent.value })[0], {
          ref: v => {
            const el = unrefElement(v as HTMLElement);
            if (typeof el?.hasAttribute === 'undefined') {
              return el;
            }

            // special case to handle animation for PopperContent
            if (el?.hasAttribute('data-soybean-popper-content-wrapper')) {
              node.value = el.firstElementChild as HTMLElement;
            } else {
              node.value = el;
            }

            return el;
          }
        });
      }
      return null;
    };
  },
  {
    name: 'Presence',
    props: ['present', 'forceMount'],
    slots: {}
  }
);
