<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { groupByProblem } from '#lib/kb/problems';

  let { ticket }: { ticket: number } = $props();

  const merged = $derived((reports as Report[]).filter((r) => r.mergedInto === ticket));
  const split = $derived(groupByProblem(merged, tenantOf, notes.oneDayMove));
  const total = $derived(split.groups.reduce((n, g) => n + g.reports.length, 0) + split.unplaced.length);
  const tags = (g: { taggedAs: Record<string, number> }) =>
    Object.entries(g.taggedAs)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, n]) => `${tag} ×${n}`)
      .join(' · ');
</script>

<p class="sum">
  <strong>{total}</strong> reports ({split.rows} rows in the export, {split.duplicates} repeats dropped) ·
  <strong>{split.groups.length}</strong> problems
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>share</th><th>tagged as</th><th>tenants</th><th>seen</th></tr>
  </thead>
  <tbody>
    {#each split.groups as g (g.problem)}
      <tr>
        <td><code>{g.problem}</code></td>
        <td>{g.reports.length}</td>
        <td>{((g.reports.length / total) * 100).toFixed(1)}%</td>
        <td class="tags">{tags(g)}</td>
        <td>{g.tenants.length}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
      </tr>
    {/each}
  </tbody>
</table>

{#if split.unplaced.length}
  <p class="note">{split.unplaced.length} reports come from tenants that write the month first; they are not this bug.</p>
{/if}

<style>
  .sum { font-size: 1.1rem; }
  .tags, .note { color: var(--muted); font-size: 0.85em; }
</style>
