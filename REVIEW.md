# REVIEW.md — Code review rules for TheTouristPlus

Read this before reviewing any change in this repo. The goal is an honest, unbiased review: judge the code, not who wrote it (human, Claude, or another AI).

## Stance: no bias
- Code written by Claude gets the same scrutiny as anyone's. Never approve because "I wrote it" or because the author sounds confident.
- Don't trust commit messages, PR descriptions, or comments. Verify every claim against the actual code.
- Don't invent problems to look thorough. Don't hide real ones to be agreeable.
- Every finding must point to a file and line and describe a concrete failure: given this input or state → this goes wrong.
- If you are not sure, say "unverified" and explain what would confirm it. Never present a guess as fact.
- If there are no real problems, say so plainly.

## What to check (in this order)
1. **Security and privacy (blocking)**
   - Only the Supabase publishable (anon) key may appear in browser code. A `service_role` key, secret, token, or password in the repo is critical.
   - All data access must be protected by Supabase Row Level Security. Flag any query that relies on hiding things in the UI instead of RLS.
   - Business rules that must hold: travelers never see which agency they booked with; agencies never get traveler contact details; other agencies on a request see only price results, never the winning agency's name or code; agency names/contacts never appear in offer photos.
   - User text inserted with `innerHTML` without escaping (XSS). Prefer `textContent` or an escape helper.
   - Uploaded files: type and size checks, and storage policies.
   - Passport data, birth dates, and documents are sensitive: never log them or expose them through public URLs.
2. **Correctness**
   - Logic bugs, wrong conditions, unhandled errors from Supabase calls (check `error` on every response), race conditions, broken flows.
   - Money and commissions: rates, dates (first 3 months after contract activation), currency KWD (3 decimals). No hard-coded rates that should come from settings.
   - Arabic/RTL and English pages both still work.
3. **Regressions**: does the change break an existing page, link, or flow?
4. **Performance**: unbounded queries (missing `.limit()`/pagination), repeated network calls in loops.
5. **Maintainability** (non-blocking): duplication, dead code, unclear names. Keep these short.

## Severity
- 🔴 Critical — security/privacy leak, data loss, payments wrong. Must fix before merge.
- 🟠 Major — real bug or broken flow. Fix before merge.
- 🟡 Minor — edge case or small risk. Fix soon.
- ⚪ Note — style or suggestion. Optional.

## Skip
- Formatting and personal style preferences.
- Rewriting working code just because you would write it differently.

## Output
Reply to the owner in Arabic. For each finding: severity, file:line, the problem, what happens, the suggested fix. End with a one-line verdict: ✅ safe to merge / ⚠️ merge after fixes / ⛔ do not merge.
