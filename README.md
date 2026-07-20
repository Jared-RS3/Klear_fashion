# Klear_fashion

Klear — AI fashion platform proposal (static site). The landing page is
[`index.html`](index.html), served at the site root. Deployed as a static
site on Netlify.

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (Netlify)

This is a plain static site with no build step. Netlify serves `index.html`
from the repository root (see `netlify.toml`).
