**Reports covered: 33** (unique ids, merged into #4471, 2026-04-17 to 2026-09-22)

The booking-v3 form prints `MM/DD/YYYY` under its date field. People at day-first tenants type month first because the hint tells them to, and the form then reads the value the tenant's way, so the date flips. The parser is not at fault here. The form hint is.

- Tenants (3, all booking-v3): alder.physio 12, copper.studio 11, pale.harbour 10
- Channel: form only (33)
- Intake tagged 18 as `hint` and 15 as `parser`, so the intake tag is wrong for almost half

Fix: show a hint that matches the tenant's locale (`DD/MM/YYYY` for day-first tenants), or use a date picker.

Warning: the parser fix in the first ticket will flip these reports the other way if the hint stays as it is. Ship the hint change with it.

Evidence: R-41230, R-41241, R-41251, R-41259, R-41262. Page: kb/incidents/4471-split.
