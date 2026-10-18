# Project rules

- Keep legacy Tailwind green color families and dark-blue shades mapped to global semantic brand tokens; this allows color-only theme updates without modifying component behavior.
- Keep homepage content styling scoped to `.homepage`, while shared navigation and footer use its white presentation across all pages for consistency.
- Keep the homepage banner rotation behind a presentation-only enable flag so the temporarily paused slideshow can be restored without changing banner management.