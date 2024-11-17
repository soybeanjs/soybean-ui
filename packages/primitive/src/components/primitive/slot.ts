import { Comment, cloneVNode, defineComponent, mergeProps } from 'vue';
import { renderSlotFragments } from '../../shared';

export const Slot = defineComponent({
  name: 'PrimitiveSlot',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default) return null;

      const children = renderSlotFragments(slots.default());
      const firstNonCommentChildrenIndex = children.findIndex(child => child.type !== Comment);
      if (firstNonCommentChildrenIndex === -1) {
        return children;
      }

      const firstNonCommentChildren = children[firstNonCommentChildrenIndex];

      // remove props ref from being inferred
      delete firstNonCommentChildren.props?.ref;

      const mergedProps = firstNonCommentChildren.props ? mergeProps(attrs, firstNonCommentChildren.props) : attrs;

      // remove class to prevent duplicated
      if (attrs.class && firstNonCommentChildren.props?.class) {
        delete firstNonCommentChildren.props.class;
      }

      const cloned = cloneVNode(firstNonCommentChildren, mergedProps);

      // Explicitly override props starting with `on`.
      // It seems cloneVNode from Vue doesn't like overriding `onXXX` props.
      // So we have to do it manually.
      for (const prop in mergedProps) {
        if (prop.startsWith('on')) {
          cloned.props ||= {};
          cloned.props[prop] = mergedProps[prop];
        }
      }

      if (children.length === 1) {
        return cloned;
      }

      children[firstNonCommentChildrenIndex] = cloned;

      return children;
    };
  }
});
