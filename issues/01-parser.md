**Reports covered: 379** (unique ids, merged into #4471, 2026-04-01 to 2026-10-04)

The shared date parser reads every date month first. Tenants that write the day first get their dates flipped, for example 7 April becomes 4 July. This is the bug #4471 describes.

- Tenants (11): harbour.dental 52, kettle.books 47, nine.lanterns 44, morrow.tax 40, long.table 39, ridge.clinic 36, stone.and.sons 30, lantern.row 28, alder.physio 23, pale.harbour 21, copper.studio 19
- Channels: app 204, email 150, form 25
- Intake tagged 356 as `parser` and 23 as `hint`
- Counted as in the desk's own table: 5 of these reports (R-41202, R-41209, R-41236, R-41344, R-41620) read as a one-day move, not a swap. The desk files them under `parser` by tenant and footnotes them. They are included in the 379 and may need a time zone check.

Fix: parse dates in the tenant's locale order (day first for day-first locales). The fix already queued under #4471 belongs here.

Warning: do not ship this fix alone. It changes how booking-v3 form input is read, which affects the `hint` problem (see #2).

Evidence: R-41200, R-41201, R-41203, R-41204, R-41205. Page: kb/incidents/4471-split.
