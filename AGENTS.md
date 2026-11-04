# Repository contribution instructions

## Purpose
Maintain a reusable Node.js API foundation. Keep application-specific business logic out of this template.

## Working rules
- Use Node.js 24+, TypeScript strict mode, Fastify 5 and Zod.
- Keep database and authentication integrations optional.
- Validate untrusted request input at route boundaries.
- Do not expose internal exception details in HTTP responses.
- Never commit secrets, real environment files, tokens, private keys or production data.
- Keep dependencies minimal and justify new runtime dependencies.
- Add or update tests for behavior changes.
- Update README and OpenAPI metadata when routes or configuration change.
- Do not commit directly to main; use a focused feature branch and pull request.
- Do not merge or deploy without repository-owner approval.
- Do not introduce paid services or change the agreed framework without explicit owner approval.

## Required checks
Run these commands in a Node.js 24 environment before requesting review:

```bash
npm install
npm run check
```

Report the actual commands and outcomes. If a check could not be run, say so clearly.

## Pull requests
Describe purpose, changed files, setup/configuration changes, tests and results, security implications, limitations and any owner decisions required.
