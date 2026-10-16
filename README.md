# Los Angeles Kush Operations Handbook — Static Website

This is a standalone, read-only edition of the complete Inventory and Accounting Operations Handbook. It includes all 26 procedures and the blue/royal-blue design. Search, section filters, task filters, responsibility filters, sorting, and procedure dialogs run entirely in the browser.

There is no database, backend, login, API, package installation, or build step. Associate name/date/notes fields, interactive checklists, archives, and bookmarks are removed. Nothing is submitted or stored. Existing browser checklist records from the privately hosted version are not included in this export.

## Files

- `index.html` — The complete handbook content and page structure, including every procedure and step.
- `styles.css` — Responsive layout, blue branding, and print styles.
- `app.js` — Optional browser-only search, filters, sorting, and dialogs.
- `icon.svg` — Local favicon.
- `.nojekyll` — Tells GitHub Pages to serve these static files directly.

## Open Locally

Extract the ZIP and open `index.html` in a browser. Keep the files together. No local server is required. All content is already in the HTML, so the handbook can also be read with JavaScript disabled. Linked external reference websites require internet access.

## GitHub Pages Hosting

This package has not been published to GitHub, and the existing Sites publication remains private.

Before enabling Pages, choose the intended audience. GitHub Pages sites are publicly accessible by default even when their repository is private. Private Pages access controls require a qualifying organization project site on GitHub Enterprise Cloud. This static package does not add access protection of its own.

When you are ready to publish to the chosen audience:

1. Extract the ZIP.
2. Add the contents of the extracted folder to your repository's root. `index.html` should be at the root, alongside `styles.css`, `app.js`, `icon.svg`, and `.nojekyll`. Upload the extracted files, not the ZIP itself. If you use a file picker, ensure the dotfile `.nojekyll` is included.
3. Commit the files to your publishing branch, such as `main`.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment → Source**, select **Deploy from a branch**.
6. Select the publishing branch and **/(root)**, then save. Confirm the intended Pages visibility where your plan supports it.
7. Use the website URL shown by GitHub after deployment completes.

All asset paths are relative, so the site supports both a repository project URL and a custom domain without path changes. If using `/docs` as the publishing folder, put all the package files together in `/docs` and select that folder instead.

GitHub documentation:

- [Configure a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Private Pages access controls](https://docs.github.com/en/enterprise-cloud%40latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site)

## Edit The Handbook

Edit `index.html` in any text editor. Each complete procedure is marked by `procedure:start:…` and `procedure:end:…` comments. Update its matching library card if changing the title, summary, responsibility, task, or time estimate. The card's `data-section`, `data-roles`, `data-task`, and `data-title` attributes drive the filters and sorting.

Procedure wording, supply sources, upper-management purchasing responsibility, time estimates, email examples, and reference links are carried over from the current handbook. Continue using management-approved procedures and current external references.

Edit colors and layout in `styles.css`. No generated assets or paid services are required. To print the full handbook, use the browser's Print command; the print stylesheet includes every procedure.
