# Sandhit Karmakar — animated engineering portfolio

A complete portfolio with server-rendered content, GSAP motion, and Lenis smooth scrolling. The visual reference is [itsjay.us](https://www.itsjay.us/); this implementation uses original styling, artwork, copy, and project presentation tailored to Sandhit.

## 1. The plan

**Audience:** engineering hiring managers, collaborators, and people exploring Sandhit’s work.

**Primary journey:** understand who Sandhit is → explore selected projects → read experience → contact him.

| Page section      | Purpose                                  | Implementation                                               |
| ----------------- | ---------------------------------------- | ------------------------------------------------------------ |
| Hero              | Establish identity and engineering focus | Oversized type, chrome sculpture, staggered entrance         |
| Expanding reel    | Bring selected work into motion          | A small video appears over the hero and grows with scrolling |
| About             | Explain interests and background         | Editorial copy with a scroll reveal                          |
| Selected projects | Show what Sandhit builds                 | QueryLens AI and Welth, large linked visual concepts         |
| Experience        | Connect projects to professional work    | Standard Chartered and Canverro                              |
| Approach          | Explain technical strengths              | Interface, backend, and AI development                       |
| Contact           | Make the next step easy                  | Email, copy address, GitHub, LinkedIn                        |

**Art direction:** pale gray canvas, near-black typography, acid-lime accents, restrained rules, a floating navigation dock, and a dark technical-skills section. A serif contrast makes the editorial headings distinct.

The reference’s hierarchy, large typography, floating navigation, project-focused layout, and playful motion informed the direction. This is an original adaptation; the reference’s code, photographs, videos, branding, and exact animation timelines are not reproduced.

## 2. Stack

- React 19 and TypeScript.
- Next.js App Router conventions, served through the Sites Vinext/Vite runtime.
- GSAP 3.15 with ScrollTrigger, loaded only on the client.
- Lenis 1.3 for synchronized wheel/anchor scrolling.
- Custom responsive CSS; Tailwind is available in the starter.
- Self-hosted Inter and Space Grotesk variable fonts.
- Optimized WebP artwork, a Memoji-style dock avatar, a 12-second H.264 reel, and an SVG favicon.
- No backend, database, keys, or environment variables are needed for the portfolio.

The current deployment uses Sites with a Cloudflare-compatible Worker build. This is **not an already-deployed Vercel project**.

## 3. Run locally

Use Node.js 22.13+ and the package-manager version declared in `package.json`. Keep `pnpm-lock.yaml` as the lockfile.

```bash
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

The portable starter normally serves at `http://localhost:5173`. Use the address printed by the development command.

```bash
pnpm exec tsc --noEmit
pnpm build
pnpm exec prettier --write app README.md
```

The scripts choose a local execution profile. A clean checkout defaults to the portable Vinext runtime; the managed preview profile is deliberately excluded from Git. Preserve the existing installation/build scripts for Sites.

## 4. Where to edit

| File                           | What belongs there                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `app/page.tsx`                 | Page entry point                                                                                 |
| `app/portfolio.tsx`            | Personal content, social links, project data, sections, navigation, copy-email and motion toggle |
| `app/motion.ts`                | GSAP timelines, ScrollTrigger configuration, Lenis integration, magnetic hover, teardown         |
| `app/showreel.tsx`             | Video markup, poster, and visibility-aware playback                                              |
| `app/globals.css`              | Palette, typography, spacing, responsive breakpoints, hover/focus/reduced-motion styling         |
| `app/layout.tsx`               | Page title, description, Open Graph text and favicon                                             |
| `public/chrome-asterisk.webp`  | Original decorative artwork                                                                      |
| `public/showreel.mp4`          | Bundled silent 1280×720 motion reel, approximately 338 KB                                        |
| `public/showreel-poster.webp`  | Still image shown before playback or when autoplay is blocked                                    |
| `public/memoji.webp`           | Dock avatar; replace with your own Memoji or portrait                                            |
| `scripts/generate-showreel.py` | Optional source for regenerating the bundled reel                                                |
| `public/fonts/`                | Local font assets                                                                                |
| `public/favicon.svg`           | Site monogram                                                                                    |
| `.openai/hosting.json`         | Existing Sites identity; keep its project ID unchanged                                           |

To add a project, extend the `projects` array and supply a real title, description, technology list, and URL. The current two visual layouts are specialized for QueryLens and Welth; add a corresponding visual component when adding a third project.

The project cards are **interface concepts**, clearly labelled on the page. They are not captured screenshots of the deployed applications. Replace them with your own authorized screenshots when you want to show exact product UI.

Professional information and links were taken from the supplied résumé and project notes. No new performance metrics, employers, availability claims, or academic scores were invented. The full résumé, phone number, and private source notes are not published.

### Replace the video or Memoji

1. Replace `public/showreel.mp4` with your own recording. Keep it silent, encoded as H.264 MP4 with the `yuv420p` pixel format, ideally 1280×720 or 1920×1080. Enable fast-start encoding for progressive playback. The container displays a 16:9 crop.
2. Replace `public/showreel-poster.webp` with a matching still image. Keep the filenames to avoid changing the component; otherwise edit the paths in `app/showreel.tsx`.
3. Replace `public/memoji.webp` with a square image. A 196×196 export is ample for the navigation dock. The current generated Memoji-style illustration is a generic avatar, not a likeness based on a supplied photograph.

The bundled reel is original motion typography and illustrative QueryLens/Welth interface concepts. It is not a recording of either live application. Its sample charts do not represent personal finances, business results, or performance metrics.

To optionally rebuild that reel, install Python's `Pillow`, `fonttools[woff]`, and `brotli` packages plus FFmpeg, then run `python scripts/generate-showreel.py` from the project root. These tools are only needed to author the video; they are not needed to run or deploy the website. Font license files are included beside the fonts.

## 5. Motion map

| Effect              | How it works                                                                                                    | Tuning point                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Hero entrance       | Masked text rises into place with a stagger                                                                     | `.hero-line > span`, duration and stagger                                                                     |
| Intro details       | Opacity and vertical offset settle into position                                                                | `.intro-item`                                                                                                 |
| Navigation entrance | Dock slides up once                                                                                             | `.dock`                                                                                                       |
| Expanding video     | Hero pins briefly; the video scales from 18% to full size, with a small upward movement and rotation correction | Timeline `expanding-showreel` in `app/motion.ts`; `scrub: 0.7`, scroll distance, and `.showreel` width in CSS |
| Smooth scroll       | Lenis advances from the GSAP ticker                                                                             | `duration: 1.1`                                                                                               |
| Reading progress    | ScrollTrigger drives horizontal scale                                                                           | `.scroll-progress`                                                                                            |
| Section reveals     | Elements rise as they enter the viewport                                                                        | `.reveal`, start threshold                                                                                    |
| About reveal        | Opacity and movement follow scroll progress                                                                     | `.reveal-words`                                                                                               |
| Project reveals     | Small scale and vertical shift                                                                                  | `.project-visual`                                                                                             |
| Project hover       | Concept panels gently straighten                                                                                | `.preview-panel` in CSS                                                                                       |
| Magnetic controls   | Pointer distance drives quickTo setters                                                                         | `.magnetic`, multiplier `.18`                                                                                 |
| Floating sculpture  | Sine easing and a subtle rotation                                                                               | Desktop/fine-pointer media condition                                                                          |
| Hero transition     | Type recedes as the reel expands; scrolling back restores the hero                                              | `.hero-title`, `.hero-middle`, `.hero-caption`, `.hero-foot`                                                  |
| Toolkit marquee     | A duplicated track moves continuously                                                                           | `.marquee-track`, duration `32`                                                                               |

Lenis integration follows its [official GSAP guidance](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger): call `ScrollTrigger.update` on Lenis scroll and drive `lenis.raf(time * 1000)` from GSAP’s ticker. Each ticker, listener, media context, and animation is removed on cleanup.

Avoid layering CSS smooth scrolling and Lenis at the same time. The motion module temporarily switches native scroll behavior to `auto` and restores it when destroyed.

Avoid changing layout properties every frame. Animate transforms and opacity. Keep hover effects off coarse-pointer/touch layouts. Do not add a second animation framework for the same elements.

## 6. Accessibility and performance

- Text is present in the server-rendered page and stays visible if motion fails to load.
- `prefers-reduced-motion` disables the motion setup; a dock button also lets visitors pause it.
- The same dock control pauses the video. Reduced-motion visitors see an ordinary, unpinned video poster after the hero.
- The reel plays muted and inline, pauses when offscreen or the tab is hidden, and keeps its poster if autoplay is unavailable.
- The manual motion preference is saved locally on that device.
- Native anchor links continue working without JavaScript.
- Buttons and links have keyboard focus styles and accessible names.
- There is a skip-to-content link and semantic heading structure.
- Touch layouts use ordinary scrolling without desktop magnetic effects.
- Repeating animations pause when their sections are offscreen.
- Fonts are self-hosted; hero dimensions reserve layout space.
- The hero artwork is decorative and uses an empty alt attribute.
- Contact opens the visitor’s email app. There is no fake form submission or mail-sending backend.

## 7. Deployment

### Current Sites deployment

This project retains its registered Site identity and source history. Changes follow the same flow: edit → type-check and preview → build → save the exact source version → deploy. The initial published version is private to its owner. Public recruiter access requires changing the Site’s audience to public; a private URL is not suitable for job applications.

A domain can be connected after choosing the final address and public audience. Domain purchase, DNS changes, and public access changes are not part of this initial private deployment.

### If you choose Vercel later

The application files use familiar App Router conventions, so the content can be moved into a standard Next.js project. Treat this as a separate deployment target; do not assume that Vercel will understand the Sites Worker artifact.

1. Create or reuse your own Next.js App Router repository.
2. Copy the portfolio’s `app` files and `public` assets into it.
3. Keep its standard Next.js config and install the required app dependencies: `gsap`, `lenis`, and `lucide-react`.
4. This stylesheet includes a starter-vendor import. Either copy `vendor/shadcn-tailwind-4.13.0.css` plus its dependencies, or remove the first three Tailwind/vendor imports and the `@theme inline` block; the portfolio uses custom CSS and does not depend on those utilities except for optional font smoothing.
5. Use standard scripts: `next dev`, `next build`, and `next start`.
6. Run its TypeScript and production-build checks, then import the repository into Vercel as a Next.js project.
7. Confirm desktop/mobile behavior, update the canonical URL to the final public domain, and connect that domain in Vercel.

The Vercel path is a migration checklist, not a tested second deployment.

## 8. Next content improvements

The current site works as a complete first version. Useful follow-up content, when ready:

- Your own product screenshots or a short, optimized project recording.
- A dedicated case study for each project: problem, architecture, trade-offs, contribution, result.
- A current downloadable résumé that you approve for public access.
- A verified canonical domain, sitemap, and Search Console setup once the site is public.

Do not publish employer-internal screenshots or source code as portfolio assets.

## 9. A prompt for future edits

> Work on the existing Sandhit portfolio; preserve its identity, package manager, and current deployment target. Read README.md and the existing source first. Keep the grayscale/ink/lime art direction, responsive behavior, accessible navigation, reduced-motion support, and GSAP cleanup. Update [describe the section or behavior]. Use only supplied facts, links, and authorized assets. Avoid adding a new animation library or replacing the project scaffold. Run TypeScript and a production build, verify the changed interactions, and publish the updated Site unless I ask for local-only work. Explain the change and any remaining limitation.
