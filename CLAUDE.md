# CLAUDE.md — touristplus-partners

## What this is
The partners dashboard for TheTouristPlus (partners.thetouristplus.com). Travel agencies self-register with their documents, view traveler trip requests, and send price offers (max 3 per request, per city for multi-city). Also the owner's admin controls.

## Stack
- Static site on GitHub Pages: plain HTML, CSS, vanilla JS (no build step, no framework).
- Backend: Supabase (auth, Postgres with Row Level Security, storage, Edge Functions).
- `config.js` holds only the public URL and publishable key. Never add secret or service_role keys anywhere in this repo.

## Rules when changing code
- Security lives in Supabase RLS and Edge Functions, not in hidden UI. Any new table or query needs a matching RLS policy.
- Never expose traveler contact details to agencies, never reveal an agency's identity to travelers, and never show the winning agency to other agencies.
- Escape user content; avoid `innerHTML` with untrusted data.
- Check the `error` of every Supabase call and show a clear Arabic message.
- UI is Arabic, RTL first. Brand name is always "TheTouristPlus" in English.
- Commission rates and promo periods come from settings in the database, not hard-coded values.
- Keep changes small and focused. Don't add features the owner didn't ask for.
- Never commit straight to `main`: work on a branch and open a PR.

## Reviews
Follow REVIEW.md for every code review.

## Talking to the owner
Reply in Arabic, short and clear.
