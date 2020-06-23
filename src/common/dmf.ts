/**
 * Diff-Match-Patch utils
 */

import { DiffMatchPatch, PatchObject } from 'diff-match-patch-typescript';
import { all, identity } from 'ramda';

const dmp = new DiffMatchPatch();

export const makePatch = (pre: string, post: string) => {
  const diff = dmp.diff_main(pre, post);
  dmp.diff_cleanupSemantic(diff);
  return dmp.patch_make(pre, post);
};

/**
 * A patch is made from the diff of text A and text B, and can be applied to A
 * to recreate B. This method allows converting a patch into its reverse operation,
 * so that it can be applied to B to recreate A. This will make moving through the
 * history of a page a lot easier. You just need all the patches (or gradually load
 * needed patches around the current page for ultimate space efficiency), and apply
 * as needed. Will definitely need to test this rigorously in order to assure 100%
 * accuracy of file histories.
 */
export const reversePatch = (patch: PatchObject[]): PatchObject[] => (
  patch.map(patchObj => ({
    diffs: patchObj.diffs.map(([ op, val ]) => [
      op * -1, // The money maker
      val
    ]),

    // Also gotta swap starts and lengths
    start1: patchObj.start2,
    start2: patchObj.start1,
    length1: patchObj.length2,
    length2: patchObj.length1
  }))
);

export const applyPatch = (pre: string, patch: PatchObject[]): [ string, boolean ] => {
  const [ post, stats ] = dmp.patch_apply(patch, pre);
  return [ post, all(identity, stats) ];
};
