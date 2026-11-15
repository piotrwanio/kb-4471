// #4471 holds more than one bug. This file splits its reports into the problems they are really about.
// It builds on causes.ts: that file says which cause a report's tenant implies; this one also listens to
// what the desk already noted about reports that do not fit (desk-notes.json).
import { causeOf, uniqueById, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = 'parser' | 'hint' | 'one-day';
export const PROBLEMS: readonly Problem[] = ['parser', 'hint', 'one-day'];

export function problemOf(r: Report, t: Tenant | undefined, oneDayMove: readonly string[]): Problem | null {
  // A one-day move is not a month/day swap, whatever the tenant's locale says.
  if (oneDayMove.includes(r.id)) return 'one-day';
  return causeOf(r, t);
}

export type ProblemGroup = {
  problem: Problem;
  reports: Report[];
  taggedAs: Record<string, number>;
  tenants: string[];
  firstSeen: string;
  lastSeen: string;
};

export function groupByProblem(
  reports: Report[],
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): { groups: ProblemGroup[]; unplaced: Report[]; rows: number; duplicates: number } {
  const unique = uniqueById(reports);
  const by = new Map<Problem, Report[]>();
  const unplaced: Report[] = [];
  for (const r of unique) {
    const p = problemOf(r, tenantOf(r), oneDayMove);
    if (!p) unplaced.push(r);
    else by.set(p, [...(by.get(p) ?? []), r]);
  }
  const groups = PROBLEMS.filter((p) => by.has(p)).map((problem) => {
    const rs = by.get(problem)!;
    const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
    return {
      problem,
      reports: rs,
      taggedAs: rs.reduce<Record<string, number>>((n, r) => ({ ...n, [r.meta.intakeTag]: (n[r.meta.intakeTag] ?? 0) + 1 }), {}),
      tenants: [...new Set(rs.map((r) => r.tenant))].sort(),
      firstSeen: days[0],
      lastSeen: days[days.length - 1],
    };
  });
  return { groups, unplaced, rows: reports.length, duplicates: reports.length - unique.length };
}
