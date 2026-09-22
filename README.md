# Niki’s Nageldesign

Responsive German-language nail studio website inspired by the supplied beige, lavender and burgundy references. **Nail design only**, with no Mama Safe Space, community or partner programme. Built with plain HTML, CSS and JavaScript. No framework, npm install, build step, account keys or database required.

## Hosting on GitHub Pages

1. Open **Settings → Pages** in `gellert4/niki`.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose **main**, **/(root)**, then **Save**.
4. Once GitHub finishes deployment, the site will be available at **https://gellert4.github.io/niki/**.

All asset links are relative, so the `/niki/` project path works. The same files can be uploaded directly to any static web host. HTTPS is recommended for the clipboard button.

## Preview locally

Open `index.html` directly, or run:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Before a business launch

- Fill in the actual nail studio contact information in **config.js**. The old Mama Safe Space Instagram account is deliberately not used. Priority: WhatsApp, then email, then Instagram. Leave unknown values empty.
- Complete **impressum.html** and **datenschutz.html** with the actual business address, contact details and information appropriate to the chosen hosting and business. These are explicitly incomplete drafts, not a legal compliance guarantee.
- Confirm the prices against the current business price list. The 16 prices on this website match the price-list image supplied for this request.
- Confirm the opening date and replace the Coming soon text in **index.html** when appropriate.
- Review the supplied portrait and other inspiration images and replace them with genuine studio/portfolio photos when available. The page does not present generated design-reference images as a customer portfolio.

## Editing

| File | Purpose |
| --- | --- |
| `index.html` | Content, prices, FAQ and inquiry UI |
| `styles.css` | Brand colours, typography and responsive layouts |
| `script.js` | Mobile menu, price filters and message preparation |
| `config.js` | Verified contact destinations |
| `assets/` | Locally hosted WebP crops from the supplied references and favicon |
| `impressum.html`, `datenschutz.html` | Legal drafts to complete before business launch |

The inquiry form **prepares a message only**. It does not send or store customer information, reserve a time, or claim a booking is confirmed. Without configured contact details, the site clearly says contact information is coming soon. When details are configured, a real WhatsApp/email/Instagram destination becomes available. The message uses URL encoding and DOM text properties rather than HTML insertion.

## Design and accessibility

- Warm cream, plum and lavender brand colours; editorial serif headings.
- Responsive layout, keyboard-accessible mobile navigation and native dialog.
- FAQ disclosures and service pricing available even without JavaScript.
- All content remains visible without animation support; reduced-motion preference respected.
- No external fonts, trackers, cookie storage or remote image dependencies.
- Price list print stylesheet and original price-list image included.
