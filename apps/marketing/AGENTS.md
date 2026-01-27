# Repository Guidelines

## Project Structure & Module Organization
Core agent orchestration lives in `claude-flow/claude-flow/src` (CLI, orchestrators, ReasoningBank integrations) with Jest suites under `tests/` and `src/__tests__`. Long-term memory services are in `claude-mem/claude-mem/src`, plus hooks and plugins nested under `plugins/` and `plugins/cache`. Role briefs for sub-agents reside in `agents/`, while reusable automation commands are versioned in `commands/`. Skills (each folder with a `SKILL.md`) live in `skills/`, and shared runtime helpers such as `lib/skills-core.js` sit in `lib/`. Experimental or customer-specific worktrees are mirrored under `projects/`—treat them as sandboxes unless referenced explicitly in an issue.

## Build, Test, and Development Commands
Install toolchains per workspace, keeping Node 20+ available globally. Typical loops:
- `cd claude-flow/claude-flow && npm install && npm run dev` launches the CLI in watch mode.
- `cd claude-flow/claude-flow && npm run build` produces SWC-built ESM/CJS bundles plus binaries.
- `cd claude-mem/claude-mem && npm install && npm run build` regenerates worker hooks before syncing plugins.
- `npm test`, `npm run test:unit`, or `npm run test:integration` (same paths as above) execute the Jest matrix for claude-flow, while `npm run test` in `claude-mem/claude-mem` triggers Vitest.

## Coding Style & Naming Conventions
TypeScript/JavaScript files use 2-space indentation, ES modules, and `camelCase` for functions with `PascalCase` for classes. Avoid implicit any; run `npm run typecheck` in claude-flow and `tsx --noEmit` or `tsc` in claude-mem before opening a PR. Automatic formatting is enforced via `npm run format` (Prettier) and `npm run lint` (ESLint). Skill descriptors follow kebab-case folder names plus a `SKILL.md` frontmatter block.

## Testing Guidelines
Group Jest specs under `tests/<layer>` or `src/__tests__`, mirroring the feature path (`feature-name.test.ts`). Aim for `npm run test:coverage` ≥85% statements before merging to `main`. For claude-mem, keep Vitest files beside the module (`module.test.ts`) and use `npm run test:parser` for parser regressions. When adding a new skill or command, include validation snippets or usage notes in the same directory and link any synthetic transcripts to `file-history/` for replay.

## Commit & Pull Request Guidelines
History is currently empty, so adopt Conventional Commits (`feat: add swarm monitor ui`, `fix: guard sqlite import`) and keep scope names aligned with top-level folders. Each PR should include: crisp summary, testing log (commands + results), linked task/issue, and screenshots or CLI traces when touching UX. Rebase before merging to maintain a linear story; avoid committing credentials or runtime cache files.

## Security & Configuration Tips
Secrets belong in local `.env` files or `settings.json`, never in tracked markdown. Before running `npm run build` or plugin sync scripts, verify that `~/.claude/plugins` paths exist and sanitize any API keys echoed in logs. Use `git update-index --skip-worktree` for machine-specific configs inside `session-env/` and audit new dependencies with `npm audit --omit dev` prior to publishing.
