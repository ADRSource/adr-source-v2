# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build, Lint & Test Commands

- Generate GraphQL types: `pnpm run gen`
- Development: `pnpm run dev`
- Build: `pnpm run build`
- Lint: `pnpm run lint`
- Format: `pnpm run format`
- Type check: `pnpm run typecheck`
- E2E tests (all): `pnpm run test:e2e:run`
- E2E tests (UI mode): `pnpm run test:e2e:dev`
- Run single E2E test: `pnpm exec playwright test tests/e2e/example.spec.ts`

## Code Style Guidelines

- Use TypeScript with strict type checking
- Format: 100 char line length, 2 space indentation, single quotes
- Imports: Use auto-sorted imports with prettier-plugin-organize-imports
- Path aliases: Use `~/*` for src/ and `~app/*` for app/ directories
- Components: Use functional React components with TypeScript interfaces
- Styling: Use Tailwind CSS with custom CVA variants and plugins
- Classes: Use className prop with cva() utility for variant management
- Error handling: Use @typescript-eslint/strict-boolean-expressions
- Naming: PascalCase for components, camelCase for variables/functions
- File structure: Group related components in directories with index files
- React patterns: Use explicit typing for props interfaces and forwardRef when needed