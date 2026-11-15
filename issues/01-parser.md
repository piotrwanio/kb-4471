**Reports covered: 374** (unique ids, merged into #4471, 2026-04-01 to 2026-10-04)

The shared date parser reads every date month first. Tenants that write the day first get their dates flipped, for example 7 April becomes 4 July. This is the bug #4471 describes.

- Tenants (11): harbour.dental 52, kettle.books 46, nine.lanterns 43, morrow.tax 40, long.table 39, ridge.clinic 36, stone.and.sons 30, lantern.row 27, alder.physio 22, pale.harbour 20, copper.studio 19
- Channels: app 202, email 147, form 25
- Intake tagged 351 as `parser` and 23 as `hint`

Fix: parse dates in the tenant's locale order (day first for day-first locales). The fix already queued under #4471 belongs here.

Warning: do not ship this fix alone. It changes how booking-v3 form input is read, which affects the `hint` problem (see the second ticket).

Evidence: R-41200, R-41201, R-41203, R-41204, R-41205. Page: kb/incidents/4471-split.
