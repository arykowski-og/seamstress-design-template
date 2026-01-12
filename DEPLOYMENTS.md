# Deployments

This project has automatic deployments to two platforms.

## Production Deployments

Both deploy automatically when you push to `main`:

- **Netlify**: https://seamstress-design.netlify.app
- **GitHub Pages**: https://silver-spoon-mw6m547.pages.github.io/

## PR Preview Deployments

Every pull request automatically gets a preview deployment on Netlify:

```
https://deploy-preview-{PR_NUMBER}--seamstress-design.netlify.app
```

The preview URL is posted as a comment on the PR by the Netlify bot.

## Configuration

- **Netlify config**: `netlify.toml`
- **GitHub Actions workflow**: `.github/workflows/deploy-gh-pages.yml`

## Local Testing

Test Netlify builds locally:

```bash
npm run build:netlify
npm run preview:netlify
```

Test GitHub Pages builds locally:

```bash
npm run build
npx serve dist -s
```

## Netlify Dashboard

Manage deployments, view logs, and configure settings:
https://app.netlify.com/sites/seamstress-design
