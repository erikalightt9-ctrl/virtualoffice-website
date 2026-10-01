Current deployment: Cloudflare Workers Static Assets, project pdmn-virtual-office. Use its New deployment button to upload the updated ZIP. The Pages instructions below describe the alternative Pages setup.

# Cloudflare Pages upload

The website exports to static files. No Node.js server, SMTP password, API key,
database or Cloudflare Function is needed for the published site. The contact
form opens a draft in the visitor's configured email app; they must press Send
there. It does not claim that the website has delivered an inquiry.

## First upload

1. Create your Cloudflare account and verify your email.
2. Open Workers & Pages in the Cloudflare dashboard.
3. Choose Create application, then the Pages Get started option, then Drag and drop your files.
4. Enter a project name, such as `pdmn-virtualoffice` (subject to availability).
5. Upload `pdmn-cloudflare-static.zip` from the project folder, or upload the `out` folder.
6. Click Deploy site / Save and Deploy. No build command or environment secrets are needed for this prebuilt upload.
7. Open the assigned HTTPS pages.dev address. Check the home, packages, contact and location pages, including a direct refresh of /contact and a package inquiry link.
8. Test the email button on a device with a configured email app. Check the recipient, selected package and draft details before manually sending.

Use only the prepared ZIP or `out` folder, never the source project, `.env` files,
`node_modules`, or `.next` folder. The ZIP has index.html at its root.

The free address is a subdomain ending in pages.dev. A new custom domain costs
extra. Direct Upload projects use manual deployments; switching to Git-based
automatic deployments requires a new project.

## Final live address and search indexing

The initial export assumes `https://pdmn-virtual-office.erika-4d7.workers.dev`. If Cloudflare
assigns a different address, set NEXT_PUBLIC_SITE_URL to that exact HTTPS URL
and rebuild. Search indexing is enabled for the confirmed live address.
Set NEXT_PUBLIC_ALLOW_INDEXING=true for the final public build when ready.

PowerShell example (replace the URL if necessary):

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://pdmn-virtual-office.erika-4d7.workers.dev'
$env:NEXT_PUBLIC_ALLOW_INDEXING = 'true'
npm run build
node scripts/check-static.mjs
Compress-Archive -Path 'out/*' -DestinationPath 'pdmn-cloudflare-static.zip' -Force
```

Upload the rebuilt ZIP through your Pages project > Create a new deployment > Production.

## Local preview and future changes

After editing, run `npm run build`, `node scripts/check-static.mjs`, and recreate
the ZIP. `npm start` previews the exported files at http://localhost:3001; it is
only a local preview and is not required by Cloudflare.

Official guide: https://developers.cloudflare.com/pages/get-started/direct-upload/

