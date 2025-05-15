import { Comment, Fragment } from 'vue';
import type { VNode } from 'vue';
import { PatchFlags } from '@vue/shared';

export function getRawChildren(children: VNode[]): VNode[] {
  let ret: VNode[] = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i]!;
    // handle fragment children case, e.g. v-for
    if (child.type === Fragment) {
      if ((child.patchFlag ?? 0) === PatchFlags.KEYED_FRAGMENT) {
        keyedFragmentCount++;
      }
      ret = ret.concat(getRawChildren(child.children as VNode[]));
    }
    // comment placeholders should be skipped, e.g. v-if
    else if (child.type !== Comment) {
      ret.push(child);
    }
  }

  // bail if there are multiple keyed fragments
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = PatchFlags.BAIL;
    }
  }
  return ret;
}
