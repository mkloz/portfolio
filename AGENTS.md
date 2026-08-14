# Portfolio agent guide

This file is the repository-level source of truth for work in this project.
Read the narrow rule or skill named below only when it applies to the task.

## Product and stack

This is Michael Kloz's personal portfolio: a React 18 + TypeScript + Vite site
deployed to Cloudflare Pages through GitHub Actions. It uses React Router,
Tailwind CSS v4, Radix/shadcn-style primitives, Zustand, and static TypeScript
data for portfolio content.

## Working agreement

- Inspect the relevant page, nearby components, data, and rendered state before
  changing a visible surface.
- Make clear, requested changes directly. Preserve unrelated work in a dirty
  worktree and do not commit unless the user asks.
- Treat `src/data/` and the user's supplied CV or project evidence as the source
  of truth for biography, skills, dates, metrics, and project claims. Never
  invent professional facts or inflate outcomes.
- Prefer the existing stack and shared primitives. Add a dependency only when
  it materially simplifies the implementation.
- Keep generated screenshots and temporary review artifacts under ignored
  `temp/`; do not commit them.
- Use current code as evidence. Update stale guidance when it conflicts with the
  implementation.

## Architecture boundaries

- `src/pages/` owns route-level composition and page-specific sections.
- `src/components/ui/` owns reusable UI primitives; `src/components/common/`
  owns reusable portfolio components.
- `src/data/` owns static portfolio content and project records. Keep display
  components separate from content where the existing structure supports it.
- `src/services/` provides access to portfolio data; avoid duplicating the same
  filtering or lookup logic in multiple components.
- `src/hooks/` contains reusable stateful behavior. Keep one-off view state near
  the component that owns it.
- Use the `@/` alias for imports from `src/`. Follow nearby naming and file
  organization before introducing a new pattern.

## UI contract

Read `.agents/rules/ui-quality-gate.md` for meaningful UI implementation or
review. In particular:

- Build mobile-first and verify a representative mobile and desktop width.
- Preserve the established visual system unless the user requests a new
  direction. Reuse tokens and shared primitives before adding one-off variants.
- Keep the visitor's path clear: understand Michael, assess the work, open a
  project, and make contact.
- Prefer specific, evidence-backed copy over generic superlatives. Avoid
  repeating the same claim in headings, badges, stats, and body copy.
- Treat missing media, long content, empty data, loading, errors, disabled
  controls, and reduced motion as real states.
- Preserve semantic controls, keyboard behavior, visible focus, contrast, and
  practical touch targets.
- After meaningful visual work, inspect the rendered result rather than relying
  only on source code.

## Debugging

Read `.agents/rules/debugging-protocol.md` for bugs, failing checks, runtime
errors, build problems, or deployment issues. Reproduce or localize first, fix
the root cause, and run the smallest relevant verification.

## Commands

- `npm run dev` - local development server on port 3000.
- `npm run lint` / `npm run lint:fix` - ESLint checks or safe fixes.
- `npm run format` / `npm run format:check` - Prettier write or verification.
- `npm test` - run targeted behavior and regression tests once.
- `npm run typecheck` - TypeScript validation without a build.
- `npm run check:changed` - fast gate for Git-changed files.
- `npm run check` - formatting, lint, type, and test confidence gate.
- `npm run check:release` - full formatting, lint, type, and production-build
  gate used by CI.
- `npm run pages:dev` - serve the built Pages artifact through Wrangler.
- `npm run discovery:verify` - validate route shells and discovery artifacts.
- `npx skills update -p -y` - update lock-managed project skills.
- `npx impeccable update` - update the separately managed Impeccable skill.

Do not add tests mechanically. Add them when behavior, a regression, or data
transformation is cheaper to prove than to inspect. Always report what was and
was not verified.

## Skill routing

Repository skills are progressively disclosed references. Use the smallest set
that fits the task; this guide and current code override generic skill advice.

- UI design, redesign, critique, or polish: `impeccable`. Add
  `accessibility-a11y` for a focused accessibility pass and `ui-animation` for
  purposeful motion.
- Ordinary React + TypeScript implementation: `react-dev`. Use
  `react-refactor` only for architecture or decomposition work and
  `vercel-react-best-practices` for performance-sensitive changes.
- Components and styling: `shadcn-ui` and `tailwind-design-system`.
- Explicit UI review: `web-design-guidelines`.
- Visitor-facing copy: `humanizer` as the final tone pass after facts and
  structure are correct.

Do not combine multiple broad design skills for an ordinary edit. Do not add
another product's workflows, scenario systems, research rules, product copy, or
heavy audit machinery to this repository.

## Code review rules

- Flag invented or unsupported professional claims, dates, metrics, links, and
  project outcomes.
- Flag broken mobile layouts, keyboard-inaccessible controls, hidden focus,
  ignored reduced-motion preferences, and missing accessible names.
- Flag duplicated portfolio content that should live in `src/data/` or shared
  behavior that bypasses an existing service or primitive.
- Flag changes that pass type checking but leave a broken production build or
  an unreachable route.
