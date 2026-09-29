# rayhendrahanif.github.io

Personal CV website of **dr. Rayhendra Hanif**, a general practitioner and clinical researcher based in South Jakarta.

**Live:** https://rayhendrahanif.github.io (English) · https://rayhendrahanif.github.io/id/ (Bahasa Indonesia)

Built with Next.js 15 (App Router, static export), Tailwind CSS 4, Framer Motion and Lucide icons. GitHub Actions builds the site and publishes it to GitHub Pages on every push to `main`.

## Design

- **Palette:** warm paper `#FDFBF7`, slate ink `#1E293B` and a Kemenkes-teal accent. The tokens are at the top of `app/globals.css`, and a matching dark theme is included.
- **Type:** Newsreader (self-hosted serif) for headings and system-ui for body text.
- **Layout:** asymmetric hero, numbered sections with a sticky heading column, hairline rules instead of boxed cards, and spacing on an 8-pt grid.
- **Live Photo hero** (`components/LivePhoto.tsx`): the portrait tilts slowly toward the cursor and plays a short clip on hover (or tap on phones). It shows a small loading skeleton while the image loads and respects reduced-motion settings.

## Editing content

All text lives in **`content/site.ts`**, in English (`en`) and Bahasa Indonesia (`id`). Edit both when you change something. The page layout reads everything from that file.

| To change…         | Edit                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| Any text           | `content/site.ts`                                                             |
| Portrait           | `public/images/profile.jpg` (720×720) and `profile-400.jpg` (400×400)          |
| Live Photo clip    | Put `portrait-live.mp4` + `portrait-live.webm` in `public/media/`, then list them in `person.liveVideo` |
| Colours            | CSS variables at the top of `app/globals.css`                                 |

**Live Photo clip tips:** keep it 2–4 seconds, muted and square (720×720), under about 1.5 MB. Export an MP4 (H.264) for Safari/iPhone and a WebM (VP9) for other browsers. On iPhone, open the Live Photo, tap Share, then Save as Video.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000 with live reload
npm run build    # writes the static site to ./out
npm start        # serves ./out
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site and deploys it.

1. On GitHub, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**. This replaces the old "Deploy from a branch" setting and is required, because the site now has a build step.
3. Merge to `main` (or open **Actions → Deploy to GitHub Pages → Run workflow**). After about a minute the site is live at https://rayhendrahanif.github.io.

Every later push to `main` redeploys automatically. For a custom domain, add it under **Settings → Pages → Custom domain** and update `metadataBase` in `app/layout.tsx` and the URLs in `public/sitemap.xml` and `public/robots.txt`.

## Credits

Newsreader by Production Type (SIL Open Font License). Icons from Lucide (ISC).
