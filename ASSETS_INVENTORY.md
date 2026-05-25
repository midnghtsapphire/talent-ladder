# Assets Inventory

## Website and brand assets
- `/index.html` metadata for SEO, Open Graph, and Twitter cards.
- `/public/favicon.ico` favicon for browser identity.
- `/public/placeholder.svg` share/preview image currently used by OG and Twitter tags.
- `/public/robots.txt` crawler directives for search and social bots.

## Product assets
- Landing page content, calls to action, and assessment entrypoint in `src/pages/Index.tsx`.
- Authentication UI and protected flows in `src/pages/Auth.tsx` and `src/pages/Dashboard.tsx`.
- Reusable UI component library under `src/components/ui/`.

## Data and integration assets
- Supabase integration client and generated types in `src/integrations/supabase/`.
- Migration assets under `supabase/migrations/`.

## Validation assets
- Baseline scripts in `scripts/test-baseline.js` and `scripts/build-baseline.js`.
- Baseline and website smoke tests under `src/test/`.
