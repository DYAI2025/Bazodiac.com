# Deployment Guide

This guide provides detailed instructions for deploying the Celestia application to GitHub Pages and Vercel.

## Prerequisites

Before deploying, make sure you have:

- A GitHub account
- A Vercel account (for Vercel deployment)
- Node.js installed locally
- The project properly configured with your `GEMINI_API_KEY` and `ELEVENLABS_API_KEY`

## GitHub Pages Deployment

### Automatic Deployment via GitHub Actions

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
   - GitHub Actions will automatically build and deploy your site when you push to the main branch

3. **Configure Environment Variables**:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Add these secrets:
     - `GEMINI_API_KEY` with your actual API key value
     - `ELEVENLABS_API_KEY` with your actual API key value

4. **View Your Deployed Site**:
   - Once deployed, your site will be available at `https://<your-username>.github.io/<repository-name>/`

### Manual Deployment

If you prefer to deploy manually:

1. Install the `gh-pages` package globally:
   ```bash
   npm install -g gh-pages
   ```

2. Set your GitHub token as an environment variable (or ensure you're authenticated with GitHub CLI)

3. Run the deployment command:
   ```bash
   npm run deploy:github
   ```

## Vercel Deployment

### Automatic Deployment via GitHub Integration

1. **Sign in to Vercel**:
   - Go to https://vercel.com and sign in with your GitHub account

2. **Import Your Project**:
   - Click "Add New Project"
   - Select your repository from the list
   - Vercel will automatically detect it's a Vite/React project

3. **Configure Environment Variables**:
   - In the Vercel dashboard, go to "Settings" → "Environment Variables"
   - Add these variables:
     - `GEMINI_API_KEY` with your actual API key value
     - `ELEVENLABS_API_KEY` with your actual API key value

4. **Deploy**:
   - Vercel will automatically deploy your project
   - For future updates, pushes to the main branch will trigger new deployments

### Manual Deployment with Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your project directory:
   ```bash
   cd /path/to/your/celestia-project
   ```

3. Run the deployment command:
   ```bash
   vercel --prod
   ```

   The first time, you'll be prompted to log in to your Vercel account.

4. To ensure environment variables are set, you can deploy with:
   ```bash
   vercel env add GEMINI_API_KEY production
   vercel env add ELEVENLABS_API_KEY production
   ```

## Environment Variables Setup

Both GitHub Pages (via GitHub Actions) and Vercel require the `GEMINI_API_KEY` and `ELEVENLABS_API_KEY` environment variables for the application to function properly. These API keys should never be committed to the repository.

### Setting Environment Variables

**For GitHub Actions:**
- Go to GitHub → Settings → Secrets and variables → Actions
- Add these secrets:
  - `GEMINI_API_KEY`
  - `ELEVENLABS_API_KEY`

**For Vercel:**
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add these variables as production environment variables:
  - `GEMINI_API_KEY`
  - `ELEVENLABS_API_KEY`

## Troubleshooting

### Common Issues

1. **Build fails on GitHub Actions**: Make sure you've properly configured both `GEMINI_API_KEY` and `ELEVENLABS_API_KEY` as GitHub secrets.

2. **Site doesn't load after deployment**: Check that your API keys are properly set in the deployment environment.

3. **Voice interface doesn't appear**: Verify that `ELEVENLABS_API_KEY` is correctly set in your deployment environment.

4. **Vercel deployment fails**: Ensure you have the correct build command and output directory configured in `vercel.json`.

### Testing Locally Before Deployment

Before deploying, test your build locally:
```bash
npm run build
npm run preview
```

This will build your app and serve it locally to preview the production build.

## Custom Domain Setup

### GitHub Pages
To use a custom domain:
1. Add a `CNAME` file to your `public/` folder (create the public folder if needed) with your domain
2. Uncomment the `cname` line in `.github/workflows/deploy.yml`
3. Update the value to your custom domain

### Vercel
1. Go to your project in the Vercel dashboard
2. Navigate to Settings → Domains
3. Add your custom domain and follow the instructions

## Next Steps

Your application is now configured for deployment on both GitHub Pages and Vercel. Choose the platform that best suits your needs:

- **GitHub Pages**: Free hosting, good for static sites, requires a GitHub account
- **Vercel**: Free tier available, optimized for modern JavaScript frameworks, built-in preview deployments

Remember to keep your API keys secure and never commit them to version control.