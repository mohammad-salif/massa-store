# MASSA — demo furniture storefront

Static site: plain HTML, CSS and JavaScript. No build step.

```
index.html
css/style.css
js/main.js
images/
```

## Run locally
Open `index.html` in a browser, or serve the folder: `npx serve .` or `python3 -m http.server`.

## Deploy on GitHub Pages
1. Push this folder to a GitHub repo.
2. Settings > Pages > Deploy from branch > `main` / root.

## Notes
- Products, prices and service terms are demo data (see `P` in `js/main.js`).
- Checkout and newsletter are NOT connected. Add a payment provider (e.g. Stripe Checkout) and an email service before going live.
- Cart and favorites persist in `localStorage`.
- Replace the compressed images in `images/` with your own originals.
