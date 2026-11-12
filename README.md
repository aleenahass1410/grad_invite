# Graduation Invitation Website

A mobile-friendly, vertically scrolling React invitation with:
- Royal-blue and gold opening cover
- Click-the-golden-stamp envelope opening animation with floating sparkles
- Graduation cap motif
- Brother's portrait placeholder
- Scratch-to-reveal date, time and venue
- Google Maps venue button
- WhatsApp RSVP button
- “DESIGNED BY SYEDA ALEENA HASSAN” footer

## 1. Install and run

Install Node.js (LTS), then open this folder in VS Code and run:

```bash
npm install
npm run dev
```

Open the local address shown by Vite (usually http://localhost:5173).

## 2. Personalize before sharing

1. Put your brother's photo in `public/` and name it `brother-photo.jpg`.
2. Open `src/App.jsx`.
3. Replace `923001234567` in `WHATSAPP_NUMBER` with the RSVP WhatsApp number in international format, digits only (Pakistan example: 923001234567; do not include + or spaces).
4. Check the venue and Google Maps link. The current link searches for Haji Altaf Pakwan Centre in Karachi.
5. If the restaurant pin is not the exact branch you intend, replace `mapUrl` with the correct Google Maps share link.

The invitation date is set to Saturday, 14 November 2026, at 8:30 PM onwards.

## 3. Build for deployment

```bash
npm run build
```

Vite creates a `dist/` folder. Deploy that folder to GitHub Pages or another static host.

For GitHub Pages, you can use the `gh-pages` package or GitHub Actions. If your repository is a project repository (not `username.github.io`), you may need to set Vite's `base` option in `vite.config.js` to your repository name.

## Notes

- The page scrolls vertically; it does not use swipe-based slides.
- The scratch panel supports mouse and touch.
- The photo is a local file, so it will be included in your deployment when placed in `public/`.
