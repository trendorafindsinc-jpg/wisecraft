# Contributing to WISECRAFT

Thank you for your interest in contributing to WISECRAFT! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/wisecraft.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Make your changes and test locally: `npm run dev`

## Code Style

- Follow the existing TypeScript patterns
- Use the reusable UI components in `src/components/ui/`
- Maintain mobile-first responsive design
- Keep components focused and single-purpose
- Add comments for complex logic

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add new dashboard widget
fix: resolve mobile navigation overlap
docs: update README with setup instructions
refactor: simplify form validation logic
```

## Pull Request Process

1. Ensure your code passes TypeScript checks: `npx tsc --noEmit`
2. Update documentation if needed
3. Submit a PR with a clear description of changes
4. Link any related issues

## Questions?

Open an issue or reach out to the maintainers.
