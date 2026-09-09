# GitHub Pages + independent reviews API

The public frontend remains at `https://namingisnothard.github.io/saar-bites/`.
The API runs as a separate Cloudflare Worker in the Cloudflare account used to deploy it.

| Data | Location |
| --- | --- |
| Restaurant / shopping directory | Versioned source in GitHub |
| Ratings, comments, display names, photo IDs, timestamps | Cloudflare D1, `saar-bites-reviews` |
| Photo bytes | Private Cloudflare R2 bucket, `saar-bites-review-photos` |
| Local development data | `.wrangler/state/` on this computer, ignored by Git |

Local records do not automatically transfer to production. Frontend builds contain no database credentials or user uploads. Anonymous posts have a null display name; supplied names are unverified display names, not accounts. Photos are served by `/api/review-photos/:id`; public R2 bucket access is unnecessary. The API and its content must be publicly reachable for the public GitHub Pages frontend; do not point it at the existing private Sites URL, whose sign-in/access policy is independent.

## Production setup (one time)

1. Sign into your Cloudflare account with `npx wrangler login`.
2. Create resources in that account:

   ```sh
   npx wrangler d1 create saar-bites-reviews
   npx wrangler r2 bucket create saar-bites-review-photos
   ```

3. Copy `backend/wrangler.production.example.json` to `backend/wrangler.production.json` and replace `REPLACE_WITH_CREATED_D1_DATABASE_ID` with the returned database ID. The account-specific config is ignored by Git. If using multiple accounts, set `account_id` explicitly. R2 must be enabled for that account; review any Cloudflare billing prompt yourself.
4. Run `npm run deploy:api`. It validates the config, applies schema migrations, and deploys the Worker. Keep existing database/bucket bindings for updates. It does not recreate or clear data.
5. Copy the **actual** HTTPS Worker origin printed by Wrangler (without `/api` or a trailing path). In the GitHub repository, go to Settings → Secrets and variables → Actions → Variables and set `NEXT_PUBLIC_REVIEW_API_URL` to that origin. This URL is public and is not an API token.
6. Run the existing GitHub Pages workflow. It injects this variable during the static build. A missing URL, localhost in GitHub Actions, or an invalid URL fails the build instead of publishing broken upload controls.

No production deployment, account setup or GitHub variable change is performed by the local build scripts.

## Cross-origin contract

`ALLOWED_ORIGINS` is a comma-separated list of exact origins. Production defaults to `https://namingisnothard.github.io` — origins never include `/saar-bites`. Add a custom domain explicitly if it is used. The Worker supports OPTIONS preflight, GET/POST for reviews and GET/HEAD for photos, with CORS headers on success and error responses and `Vary: Origin`. It never uses wildcard/credentialed CORS. POST requires an allowed Origin. No authentication secret is embedded in the browser.

This is an anonymous public posting API: CORS governs browsers, not user identity or direct HTTP clients. It is not authentication or anti-spam protection. Configure Cloudflare rate limits or a challenge before opening it to high-volume traffic. This implementation does not add an account system or moderation console.

## Local split preview

```sh
npm run db:migrate:local
npm run dev:api
# Another terminal: create the same static frontend used by GitHub Pages.
NEXT_PUBLIC_REVIEW_API_URL=http://localhost:8787 npm run build:pages
```

The API listens on port 8787. `http://localhost:4173` is included in its local allowlist. To serve the static export with its real `/saar-bites` prefix:

```sh
node scripts/preview-pages.mjs
```

Open `http://localhost:4173/saar-bites/` or `/saar-bites/life/`.
`npm run dev` still supports the original same-origin local/Sites development flow, using the same API handlers. `npm run build` still builds that full-stack variant.

## Checks

```sh
npm run typecheck
npm run build:api
npm run test:cors
REVIEW_TEST_URL=http://localhost:8787 REVIEW_TEST_ORIGIN=https://namingisnothard.github.io npm run test:reviews
npm run test:reviews:cleanup
```

Tests only accept loopback API hosts and create identifiable temporary reviews. Cleanup removes only the exact generated test IDs and their photos from local storage. `build:api` is a dry run and never deploys.

The Pages builder stages frontend files in an isolated temporary directory, excludes server routes and bindings, and copies only the successful static export to `out/`. It does not rename/delete live source routes or interfere with the normal dev server. Deployment credentials belong in your Cloudflare session or CI secrets, never in `NEXT_PUBLIC_*` variables.
