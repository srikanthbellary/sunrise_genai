# Project structure

```
index.html                 # One-pager
fonts/                     # IBM Plex Sans (OFL) + license
DESIGN-SYSTEM-LOCKED.md    # Locked look and content
.cursor/rules/             # Agent lock — do not revert to Orbitron / neon / films
.github/workflows/deploy.yml
```

GitHub Actions copies `index.html` and `fonts/` into `out/` and publishes that folder.
