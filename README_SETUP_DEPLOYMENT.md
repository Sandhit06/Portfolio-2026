# Local setup and Vercel deployment

This guide runs the complete portfolio locally with standard Next.js, checks a production build, and deploys the same source to Vercel. For the component structure and animation design, see [README_ARCHITECTURE.md](README_ARCHITECTURE.md).

The project also retains its existing Sites/Vinext build commands. For the workflow below, use the commands ending in `:next`. No separate migration or copying of application files is required.

## 1. Prerequisites

- Node.js 22.x, version 22.13 or newer. A current 22.x patch release is recommended for consistency with the Vercel setting below.
- npm, included with Node.js.
- pnpm 11.25.0, matching `packageManager` in `package.json`.
- Git and a GitHub account for the Git-based deployment route.
- A Vercel account when you are ready to publish.

Check Node and npm in PowerShell, Terminal, or your editor's terminal:

```bash
node --version
npm --version
```

Install the project's package-manager version:

```bash
npm install --global pnpm@11.25.0
pnpm --version
```

If global installation is unavailable, use `npx --yes pnpm@11.25.0` in place of `pnpm` in the commands below. On Windows, if PowerShell blocks `npm.ps1` or `pnpm.ps1`, run the equivalent `npm.cmd` / `pnpm.cmd` command or use Command Prompt. No machine-wide execution-policy change is necessary.

## 2. Open the complete project

Extract the downloaded ZIP. Open the inner `Sandhit-Portfolio` folder containing `package.json`, `pnpm-lock.yaml`, `app/`, `public/`, `vendor/`, and `vercel.json`.

For example, on Windows:

```powershell
cd "D:\Projects\Sandhit-Portfolio"
```

On macOS/Linux:

```bash
cd ~/Projects/Sandhit-Portfolio
```

Use your actual extraction path. If cloning your own GitHub copy instead, clone it and enter the repository directory.

## 3. Install dependencies

```bash
pnpm install --frozen-lockfile
```

Keep the supplied `pnpm-lock.yaml` and `pnpm-workspace.yaml`. The lockfile pins the dependency graph; the workspace file includes dependency build approvals and package overrides. Do not create a second npm or Yarn lockfile for this setup.

No `.env` file, Supabase project, Clerk key, Gemini key, Cloudflare login, or database is needed. References to those technologies in portfolio project descriptions do not make them dependencies of this website's runtime.

## 4. Start development

```bash
pnpm dev:next
```

Open **http://localhost:3000**. The terminal prints the actual address; if the port is occupied, Next.js may offer another port. To choose one explicitly:

```bash
pnpm dev:next --port 3001
```

Edit the application files and save to see updates. Stop the server with **Ctrl+C**.

| What you want to change                        | File                             |
| ---------------------------------------------- | -------------------------------- |
| Name, bio, projects, experience and email      | `app/portfolio.tsx`              |
| Technology logos and names                     | `app/tech-stack.tsx`             |
| Scroll speed and GSAP motion                   | `app/motion.ts`                  |
| Colors, spacing, typography and hover behavior | `app/globals.css`                |
| Browser title, description and favicon         | `app/layout.tsx`                 |
| Avatar, video and poster                       | Corresponding files in `public/` |

## 5. Check a production build locally

Stop the development server first, then run:

```bash
pnpm exec tsc --noEmit
pnpm build:next
pnpm start:next
```

Open **http://localhost:3000** again. `start:next` serves the existing `.next/` production build, so rebuild after source changes. Do not run the development and production server on the same port simultaneously.

The named Next.js commands use the installed Next CLI. The dev/build commands explicitly select webpack so they use a consistent bundler. The deployment configuration runs this same production build.

Before publishing, check the hero, scroll-up/down tech lettering, video, pause/resume, contact hover and keyboard focus, project links, favicon and a narrow viewport. The dock's saved pause preference or your OS reduced-motion setting can intentionally disable the animations.

## 6. Put the source in your GitHub repository

The exported ZIP does not contain Git history. From its project root, initialize your own repository:

```bash
git init
git add .
git commit -m "Add animated portfolio"
git branch -M main
```

Create an empty repository in GitHub. Copy its HTTPS URL, then use it as `YOUR_GITHUB_REPOSITORY_URL` below:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace the placeholder with the real URL before running it. If your folder is already a Git repository, inspect `git remote -v` and use its existing remote intentionally; do not blindly replace it or rerun `remote add`.

The included `.gitignore` excludes dependency folders, generated builds, local environment files and preview state. Commit `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `vercel.json`, the application source, `vendor/`, and all required `public/` assets.

## 7. Deploy to Vercel

1. Sign in to Vercel and choose **Add New → Project**.
2. Connect GitHub if needed, then import your portfolio repository.
3. Set the **Root Directory** to the folder containing `package.json`. For a repository containing the extracted project directly, this is the repository root. If you committed an enclosing folder, select `Sandhit-Portfolio` instead.
4. Select **Next.js** as the framework and **22.x** as the Node.js version in the project settings.
5. Keep the commands from the included `vercel.json`. Clear conflicting old dashboard overrides if this is an existing Vercel project.
6. No application environment variables are required for this portfolio.
7. Click **Deploy**, inspect the build log, and open the resulting deployment URL.

The committed configuration is:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "installCommand": "npx --yes pnpm@11.25.0 install --frozen-lockfile",
  "buildCommand": "npm run build:next",
  "devCommand": "npm run dev:next"
}
```

The installation command pins pnpm explicitly. `npm run build:next` only executes a script; dependency installation is still handled by pnpm. Leave **Output Directory** at the Next.js default. Do not set it to `dist`, `dist/client`, `out`, or `public` and do not upload the Sites Worker archive to Vercel.

The Next.js build is validated locally; this guide does not imply a deployment has already been created in your Vercel account. The existing Sites publication and its access settings are managed independently from your Vercel project.

### Optional CLI route

From the same project root:

```bash
npx vercel login
npx vercel
```

Follow the prompts to link/create a project and make a preview deployment. Check that preview, then publish production:

```bash
npx vercel --prod
```

These commands deploy when you run them in your authenticated Vercel account. The CLI reads the same `vercel.json`.

## 8. Updates, domains and rollback

With the Git integration enabled, commit and push your updates:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel builds the connected branch. Verify the project's Production Branch is `main` if that is your intended production branch; pull requests and other branches can produce previews.

For a custom domain, open the project's **Settings → Domains**, add the domain you own, and apply the exact DNS records Vercel displays at your domain provider. Wait for verification and HTTPS provisioning. After the final domain is ready, add its canonical URL through `app/layout.tsx` and rebuild.

If a release breaks, use Vercel's deployment rollback controls for a known-good production deployment, then revert or fix the source commit. Test the public URL from a signed-out browser before sharing it with recruiters, because deployment protection settings can restrict access.

## 9. Troubleshooting

| Symptom                            | What to check                                                                                                                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm` is not recognized           | Reopen the terminal after installation, or use `npx --yes pnpm@11.25.0`                                                                                                      |
| Frozen-lockfile installation fails | Confirm the supplied manifest and lockfile belong to the same version; if you intentionally changed dependencies, run `pnpm install`, review and commit the updated lockfile |
| A package download fails           | Check registry/network access and the actual error; retries do not fix an unsupported package version or corporate proxy configuration                                       |
| Vercel invokes Vinext or Wrangler  | Ensure `vercel.json` is in the selected root and the build command is `npm run build:next`                                                                                   |
| Styles are missing                 | Keep `vendor/`, `postcss.config.mjs`, the global stylesheet, and the declared CSS dependencies                                                                               |
| Images or logos return 404         | Preserve the whole `public/` directory and exact filename case                                                                                                               |
| `next start` cannot find a build   | Run `pnpm build:next` successfully first                                                                                                                                     |
| Animations are absent              | Check the dock pause button and OS reduced-motion preference                                                                                                                 |
| Video stays on its poster          | Browser autoplay or power-saving policy can block playback; the static poster is intentional fallback                                                                        |
| Old favicon remains                | Try a hard refresh or a new tab; browsers cache favicons separately                                                                                                          |
| Email does not send from the site  | Contact links open an email app; there is no mail-sending server                                                                                                             |

## 10. Existing Sites commands

`pnpm dev`, `pnpm build` and `pnpm start` retain their Sites/Vinext/Worker behavior. A clean checkout uses the portable profile for that path; the managed editor uses its own ignored profile. They are separate from the standard Next.js commands documented above. Keep `.openai/hosting.json` intact when updating the existing Site.

## Official references

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js CLI](https://nextjs.org/docs/app/api-reference/cli/next)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Vercel project configuration](https://vercel.com/docs/project-configuration)
