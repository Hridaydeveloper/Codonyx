# Project rules

- Keep legacy Tailwind green color families and dark-blue shades mapped to global semantic brand tokens; this allows color-only theme updates without modifying component behavior.
- Scope homepage presentation overrides to `.homepage`; shared navigation and footer retain their existing appearance on other pages.
- Keep the homepage banner rotation behind a presentation-only enable flag so the temporarily paused slideshow can be restored without changing banner management.