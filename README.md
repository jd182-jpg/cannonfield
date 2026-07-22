# Cannon Field website

Static single-page marketing site for Cannon Field (cannonfield.com), modeled on the
Leggett Capital Partners site. Green/gray Cannon Field brand palette, Calibri type stack.

## Run locally

```bash
python3 -m http.server 8777 --directory /Users/jacksondarr/.cf-preview
```

Then open http://localhost:8777 (or use the `cannonfield` config in `.claude/launch.json`).

## Structure

- `index.html` — one scrollable page: Hero, Footprint stats, Map, Why Cannon Field,
  Process, Affiliates, Why Sell, Contact, Footer.
- `styles.css` — brand system (Cannon Green #67A443, Gray #818285, Deep Green #4E7D33).
- `script.js` — nav, scroll reveal, stat count-up, tile-grid US map builder.
- `assets/entities/` — entity logos (Minerals Fund I/II/III, Chanas, Huntsman, Longheel).

## To do / swap in later

- **Footprint map:** currently an illustrative SVG tile-grid map (21 states highlighted).
  Swap in Brian's real county-level map image at the `.map-frame` in the Map section.
- **Remaining entity logos:** 6 of the 12 portfolio companies are shown. Add the rest to
  `assets/entities/` and a matching `.ent__card` in `index.html`.
- **Contact email:** uses `info@cannonfield.com` (Brian's personal email intentionally omitted).
