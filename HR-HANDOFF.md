# GDS HR project handoff

The current user is continuing work on the GDS CAPITAL INC. HR application in this repository. Read hr/README.md for operation and architecture. Ask the user what to change next; this handoff is not a request to add features automatically.

## Scope
- HR application: hr/src (Node.js service and SQLite), hr/public (browser UI), hr/tests, hr/scripts.
- The separate public Next.js/PDMN website also lives here. Preserve its existing work. The PDMN design instructions apply to that public site, not the GDS HR branding. Follow AGENTS.md and read the installed Next.js docs before changing Next.js code.
- Keep current uncommitted work. Do not reset files or overwrite private databases.
- Do not read or transmit private databases or employee documents unless needed and explicitly authorized. Never publish hr/data or demo logins.

## Running the HR application
- Preview URL: http://127.0.0.1:3401/ . It may already be running; do not start a duplicate.
- Preview command: node hr/scripts/preview-roster.mjs
- Preview SQLite: hr/data/roster-preview.sqlite; live SQLite: hr/data/hr.sqlite. They are separate.
- Live application command: npm run hr:dev (default port 3400).
- Checks: npm run hr:test; node node_modules/eslint/bin/eslint.js hr --max-warnings=0.
- Most recent full test run: 47 tests passing before the latest visual changes. Latest visual changes passed lint and were checked in the browser; rerun relevant checks for new work.

## Current features and approved design
- GDS CAPITAL INC. branding: red, gold, white, black.
- Employee profiles: position is mandatory when saving Employment details.
- Four clickable profile boxes: Personal Information, Employment Details, Attendance, Audit History. They open separate detail views with Back to profile cards. They are not accordions.
- Profile boxes are stacked vertically at 25% container width, approximately 246 x 50 pixels at the reviewed desktop size. No Open details label, arrow, or visible subtitle on these boxes.
- The four destinations retain personal/emergency details; employment/documents/government IDs; attendance/leave/payroll/bank/loans; and audit history respectively.
- Employee self-service includes own-record-only login, optional TOTP, HR-assisted recovery, GPS clocking, live HR updates, leave requests, explanations, supporting documents, and posted payslips.
- Payslip screen and PDF itemize contributions, loans, adjustments and salary computations using posted payroll snapshots.
- Employee navigation cards are approximately twice their prior height with relevant emojis. They use a responsive 3-column desktop / 2-column mobile grid.
- Welcome banner uses existing mascot copied from public/mascot-poses/07-welcoming-client.png into hr/public/welcome-mascot.png. The HR server exposes /welcome-mascot.png.
- Welcome banner includes a visible Philippine Time (Asia/Manila, UTC+8) clock and full date, ticking each second. It uses the device clock for display; attendance remains server-timed.
- Day-specific schedules: attendance profiles accept weekday overrides (start, end, regular hours up to 16, meal break, Office/WFH/Hybrid). Engine helper `scheduleOn` in hr/src/engine.mjs; tests in hr/tests/schedules.test.mjs.
- Daily-paid basis: payroll profile `basis: 'daily'` + `dailyRate` pays rate × scheduled workdays (hr/src/engine.mjs); tests in hr/tests/daily-pay.test.mjs.
- Employee directory shows Position only. Profile header has Delete profile (history-free employees only; hr/src/service.mjs assertNoEmployeeHistory; tests/employee-delete.test.mjs).
- Rules & rates: Government contributions panel (hr/public/contributions.js; tests/contributions.test.mjs).
- Latest changes: hr/public/portal.js, hr/public/style.css, hr/src/server.mjs and hr/public/welcome-mascot.png.

## Outstanding item
The user requested a different payslip logo from an H: drive path that was inaccessible. No replacement was performed. The user needs to supply that exact image as an accessible file before proceeding. Do not substitute another logo or generate a recreation without asking.
