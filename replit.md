# STEMS Consultants Website

A premium corporate website for STEMS Consultants Pte Ltd, a structural engineering and civil engineering consultancy with over 40 years of experience, based in Sri Lanka.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port assigned by workflow)
- `pnpm --filter @workspace/stems-website run dev` — run the frontend (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `DATABASE_URL` — Postgres connection string (not currently needed, contact form is stateless)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- API: Express 5
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle for API), Vite (static for frontend)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `artifacts/stems-website/src/` — Frontend React app
- `artifacts/api-server/src/routes/` — Express route handlers
- `lib/api-client-react/src/generated/` — Generated React Query hooks
- `lib/api-zod/src/generated/` — Generated Zod validation schemas

## Architecture decisions

- Single-page website: all sections on one page with smooth anchor scroll navigation
- Contact form posts to `/api/contact` and currently logs the submission (no DB needed)
- No database provisioned — contact form is stateless for now
- The API server is shared across all workspace artifacts

## Product

A full corporate website for STEMS Consultants Pte Ltd including:
- Hero with engineering aesthetics and animated elements
- About section with animated stat counters
- Services section with 6 engineering service cards
- Featured projects gallery with filtering
- Process timeline (Planning → Design → Construction → Completion)
- Why Choose Us section
- Client testimonials carousel
- Contact form with API integration
- Glassmorphism floating navbar and dark footer

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run codegen after changing `lib/api-spec/openapi.yaml`
- Google Fonts @import must be the very first line in `index.css`
- Contact form uses `useSubmitContact` from `@workspace/api-client-react`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
