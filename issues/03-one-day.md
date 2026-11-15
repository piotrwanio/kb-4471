**Reports covered: 5** (R-41202, R-41209, R-41236, R-41344, R-41620; 2026-04-02 to 2026-10-04)

Bookings move by exactly one day. This is not a day/month swap. Examples from the reports: "Tuesday 12 May. Calendar says Monday 11 May", "Every booking in June is one day off. Only June", "Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting", "The invite arrived before I made the booking".

- Tenants (5): kettle.books, alder.physio, nine.lanterns, pale.harbour, lantern.row
- Channels: email 3, app 2
- Intake tagged all 5 as `parser`. The desk's own notes (`desk-notes.json`) list them as one-day moves.

Likely cause: a time zone or daylight saving boundary in how dates are stored or sent. Needs its own owner. Not confirmed.

The queued #4471 fix will not change these. Page: kb/incidents/4471-split.
