# rayhendrahanif.github.io

Personal CV and portfolio site of **dr. Rayhendra Hanif**, a medical doctor and clinical researcher focused on cardiovascular medicine.

**Live site:** https://rayhendrahanif.github.io

It is a hand-written static site: plain HTML, CSS and a few lines of JavaScript. There are no frameworks, no build step and no third-party requests, so it loads fast and deploys to GitHub Pages as is.

## Features

- Sections: hero with quick actions (Contact, View projects, Download CV), About, Skills, Experience timeline, Featured research, Education & honors, and Contact.
- A light/dark theme toggle. It follows the visitor's system setting and remembers their choice.
- Responsive from 320 px phones up to wide desktop monitors.
- Accessible, semantic HTML with a skip link, landmarks, keyboard-friendly menu and image viewer, reduced-motion support and alt text.
- Fast: self-hosted fonts, optimized images, lazy-loaded photos, about 230 KB in total. Lighthouse (mobile) scores are 98 Performance, 100 Accessibility, 100 Best Practices and 100 SEO.
- Print-ready: printing the page produces a clean two-page A4 CV. `cv.pdf` was generated this way.
- SEO basics: meta description, Open Graph preview image, `Person` structured data, `sitemap.xml`, `robots.txt` and a custom `404.html`.

## Project structure

```
.
├── index.html            # All page content lives here
├── 404.html              # "Page not found" page (served by GitHub Pages)
├── cv.pdf                # File behind the "Download CV" buttons
├── assets/
│   ├── css/styles.css    # All styles (colours are variables at the top)
│   ├── js/main.js        # Theme toggle, mobile menu, image viewer, copy-email
│   ├── fonts/            # Inter + Source Serif 4 (SIL Open Font License)
│   └── img/              # Profile photo, presentation photos, favicon, social image
├── robots.txt
├── sitemap.xml
└── .nojekyll             # Tells GitHub Pages to serve files as-is (no Jekyll build)
```

## Preview locally

Any static file server works. From the repository folder:

```bash
python3 -m http.server 8000
# or: npx serve .
```

Then open http://localhost:8000. You can also double-click `index.html`, but a local server behaves exactly like GitHub Pages.

## Editing the content

Everything is in `index.html`. Each section is marked with a comment banner such as `<!-- ===== EXPERIENCE ===== -->`.

| To change…                 | Do this                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| A job                      | Copy one `<li class="tl-item">…</li>` block in the Experience section and edit it.                        |
| A research project         | Copy one `<article class="project-card">…</article>` block. Put the photo in `assets/img/`.                |
| A photo's crop in its card | Adjust `style="--pos: 50% 35%"` on the `<img>` (horizontal %, vertical %).                                 |
| Skills / tools             | Edit the `<li class="chip">` items in the Skills section.                                                 |
| Certifications             | Un-comment the ready-made **Certifications** block in the Education section and fill it in.              |
| Colours                    | Edit the variables at the top of `assets/css/styles.css` (`--accent` is the teal).                        |
| Profile photo              | Replace `assets/img/profile.jpg` (720×720) and `assets/img/profile-400.jpg` (400×400) with square images. |

To link a publication, use the commented-out DOI/abstract example in the first project card.

## Updating the CV PDF

The **Download CV** buttons serve `cv.pdf` from the repository root. You have two options:

1. **Use your own CV:** replace `cv.pdf` with your file, keeping the same name.
2. **Regenerate it from the website** so it always matches the site:
   - In Chrome or Edge, open the site, press **Ctrl/Cmd + P** and choose **Save as PDF**. Under *More settings*, turn **Headers and footers** off and **Background graphics** on.
   - Or from a terminal, with the local server running:
     ```bash
     google-chrome --headless --no-pdf-header-footer --print-to-pdf=cv.pdf http://localhost:8000/
     ```

## Deploying to GitHub Pages

This repository is named `rayhendrahanif.github.io`, so GitHub publishes it at **https://rayhendrahanif.github.io**.

### 1. Push the code to GitHub

This repository already exists on GitHub, so commit and push your changes:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

If you work on a separate branch, open a Pull Request on GitHub and merge it into `main`.

<details>
<summary>Starting from scratch on a new computer or account?</summary>

1. On GitHub, click **New repository** and name it exactly `<your-username>.github.io`. Make it **Public**.
2. In this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
</details>

### 2. Turn on GitHub Pages

1. On GitHub, open the repository and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
4. Wait a minute or two. The **Actions** tab shows the deployment, and the Pages settings show the live URL when it's done.
5. Visit https://rayhendrahanif.github.io. If you still see an old version, hard-refresh with Ctrl/Cmd + Shift + R.

Every later push to `main` redeploys the site automatically.

### Optional: custom domain

In **Settings → Pages → Custom domain**, enter your domain (e.g. `www.example.com`). Then add a `CNAME` DNS record pointing to `rayhendrahanif.github.io` at your domain provider and tick **Enforce HTTPS** once it's available. Also update the URLs in `index.html` (`canonical`, `og:url`, `og:image`), `sitemap.xml` and `robots.txt`.

## Credits

- Fonts: [Inter](https://rsms.me/inter/) and [Source Serif 4](https://github.com/adobe-fonts/source-serif), both under the SIL Open Font License.
- Icons: adapted from [Lucide](https://lucide.dev) (ISC) and [Simple Icons](https://simpleicons.org) (CC0).
