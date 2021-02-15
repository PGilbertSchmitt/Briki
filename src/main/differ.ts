/**
 * Diff-Match-Patch utils
 */

import { DiffMatchPatch, DiffOperation, Diff } from 'diff-match-patch-typescript';

const dmp = new DiffMatchPatch();

export const makeDiff = (pre: string, post: string) => {
  const diff = dmp.diff_main(pre, post);
  dmp.diff_cleanupEfficiency(diff);
  
  return diff;
};

/**
 * The smaller diff is different in that the equal diff no longer contains
 * the value of the diff string, but instead three integers in order:
 * 1. The length of the equal diff string
 * 2. The position in the old string where the diff string starts
 * 3. The position in the new string where the diff string starts
 * 
 * The old start position is calculated by adding together the lengths of
 * all equal and delete diff strings before the relevant diff
 * 
 * The new start position is calculated by adding together the lengths of
 * all equal and insert diff strings before the relevant diff
 */
type InsertDiff = [ DiffOperation.DIFF_INSERT, string ]
type DeleteDiff = [ DiffOperation.DIFF_DELETE, string ]
type EqualDiff = [ DiffOperation.DIFF_EQUAL, number, number, number];
export type SmallDiff = InsertDiff | DeleteDiff | EqualDiff;

const minify = (diffs: Diff[]): SmallDiff[] => {
  let eqPos = 0,
    delPos = 0,
    insPos = 0;

  // If diffing gets really slow, could probably do some sick optimizations here
  const smallDiffs: SmallDiff[] = [];
  diffs.forEach(([ op, value ]) => {
    switch (op) {
    case DiffOperation.DIFF_INSERT:
      insPos += value.length;
      smallDiffs.push([ op, value ]);
      break;
    case DiffOperation.DIFF_DELETE:
      delPos += value.length;
      smallDiffs.push([ op, value ]);
      break;
    case DiffOperation.DIFF_EQUAL:
      smallDiffs.push([ op, value.length, eqPos + delPos, eqPos + insPos ]);
      eqPos += value.length;
      break;
    }
  });

  return smallDiffs;
};

// This could also probably do with a little optimization TLC, but only once
// it's causing problems
export const magnifyDiff = (text: string, smallDiffs: SmallDiff[], pre = true): Diff[] => {
  const getData = pre
    ? (ed: EqualDiff) => [ ed[0], ed[1], ed[2] ] as const 
    : (ed: EqualDiff) => [ ed[0], ed[1], ed[3] ] as const;
  
  const diffs: Diff[] = [];
  smallDiffs.forEach(diff => {
    switch (diff[0]) {
    case DiffOperation.DIFF_DELETE:
    case DiffOperation.DIFF_INSERT:
      diffs.push(diff);
      break;
    case DiffOperation.DIFF_EQUAL: {
      const [ op, len, pos ] = getData(diff);
      diffs.push([
        op,
        text.substring(pos, pos + len)
      ]);
    }}
  });

  return diffs;
};

// Investigate whether the semantic or efficiency diffs is actually most efficient.
// I actually suspect it to be the semantic one, since the longer equal diff strings
// will reduce greatly.
export const makeSmallDiff = (pre: string, post: string) => {
  const diff = dmp.diff_main(pre, post);
  dmp.diff_cleanupSemantic(diff);
  return minify(diff);
};
                      